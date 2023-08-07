const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            unique:true,
            required: [true, "A tour must have a name"],
            trim: true,
            maxlength: [40, "A tour must have less than 40 characters"],
            // minlength:[10, "A tour must have more than or equal than 10 characters"],
            uppercase:true
        },
        slug: String,
        duration:{
            type:String,
            required:[true, "An Art must have a duartion"]
        },
        // maxGroupSize:{
        //     type:Number,
        //     required:[true, "A tour must have a group size"]
        // },
        // difficulty:{
        //     type:String,
        //     required:[true, "A tour must be given a difficulty level"],
        //     enum:{
        //         values:["easy","medium","difficult"],
        //         message:"A difficult level must iether be easy, medium or difficult"
        //     }
        // },
        ratingsAverage:{
            type:Number,
            default: 4.5,
            min:[1, "A rating must have 1 or above 1"],
            max:[5, "A rating must have 5 or below 5"],
            set: function(val){
                return Math.round(val * 10) / 10
            }
        },
        ratingsQuantity:{
            type:Number,
            default: 0
        },
        price:{
            type:Number,
            required:[true, "An Art must have a price"]
        },
        summary:{
            type:String,
            trim:true,
            required:[true, "An Art must have a summary"]
        },
        description:{
            type:String,
            trim:true
        },
        imageCover:{
            type:String,
            required:[true, "An Art must have an Image cover"]
        },
        images:[String],
        video:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            select:false
        },
        startDates:[Date],
        secretTour:{
            type:Boolean,
            default:false
        },
        startLocation:{
            type:{
                type:String,
                default:"Point",
                enum:["Point"]
            },
            coordinates:[Number],
            address:String,
            description:String,
        },
        locations:{
            type:{
                type:String,
                default:"Point",
                enum:["Point"]
            },
            coordinates:[Number],
            address:String,
            description:String
        },
        guides: [
            {
                type:mongoose.Schema.ObjectId,
                ref:'User'
            }
        ]
    },
    {
        toJSON:{virtuals: true},
        toObject:{virtuals: true}
    }
);

// indexeing
// Compund indexing
tourSchema.index({price: 1, ratingsAverage: -1});

// Single indexing
tourSchema.index({slug: 1});

// indexing for Geospacial locations use
tourSchema.index({ startLocation: '2dsphere' });

// virtuals
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
});

tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

// prefind
tourSchema.pre(/^find/, function(next) {
    this.populate({
        path:'guides',
        select:'-__v -passwordChangedAt'
    })
    next();
});

tourSchema.pre(/^find/,function(next){
    this.find({secretTour:{$ne: true}});

    this.start = Date.now()
    next()
});

// tourSchema.post(/^find/,function(doc,next){
//     console.log(`Query took ${Date.now() - this.start} milliseconds`)
//     next()
// });

// presave
tourSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;