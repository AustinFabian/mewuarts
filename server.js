const app = require("./app.js");
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path:'./config.env'});


const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: false
}).then(()=>{
    console.log("Database Connected Successfully")
})

const port = process.env.PORT || 3000
const server = app.listen(port, function(){
    console.log("App started at port 3000")
})

// UnhandledRejection handler
process.on('unhandledRejection',function(err){
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    server.close(()=>{
        process.exit(1)
    })
});

process.on('SIGTERM',function(err){
    console.log(err.name, err.message);
    console.log('SIGTERM recieved 💥 Shutting down gracefully...');
    server.close(()=>{
        console.log(' process terminated')
    })
});