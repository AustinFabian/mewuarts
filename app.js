const Express = require('express');
const path = require('path');
const parser = require('body-parser');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors')

require('events').EventEmitter.defaultMaxListeners = 30;

const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError')
const tourRoute = require('./routes/tourRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const bookingsController = require('./controllers/bookingsController');
const viewRoute = require('./routes/viewRoute');

const app = Express();

app.enable('trust proxy')

app.use(helmet());

app.use(cors({
    origin: "*"
}))

app.options('*', cors())

app.use(Express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'));
// }

const limiter = rateLimit({
    max: 50,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP please try again in one hour'
});

app.use('/api', limiter);

// FOR STRIPE WEBHOOK CHECKOUT
app.post(
  '/webhook-checkout',
  parser.raw({ type: 'application/json' }),
  bookingsController.webhookCheckout
);

app.use(Express.json({ limit: '10kb' }));
app.use(Express.urlencoded({extended: true ,limit: '10kb'}))
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(
    hpp({
        whiteList:[
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
);
app.use(compression());

app.use('/',viewRoute);
app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/bookings',bookingsRoute)
app.use('/api/v1/reviews',reviewRoute);

let count = 0;
app.get('/home',function(req,res){

    count++
    
    res.send(`<h1> ${count} counts <h1>`)
})

// FOR UNKNOWN URL ROUTE
app.all('*',(req,res,next)=>{
    next(AppError(`Can't find ${req.originalUrl} in this server`, 404))
})
app.use(errorController);

module.exports = app