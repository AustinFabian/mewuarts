const Review = require('./../model/reviewModel');
const catchAsync = require('./../utils/catchAsync');
// requiring our custom handler factory function
const handler = require('./handlerFactory');


// GET ALL REVIEWS
exports.getReviews = handler.getAll(Review);

// GET ONE REVIEW
exports.getReview = handler.getOne(Review)

// CREATE REVIEW
exports.setTourUserIds = (req,res,next)=>{
    // Allows nested routes
    if(!(req.body.tour)) req.body.tour = req.params.tourId;
    if(!(req.body.user)) req.body.user = req.user.id;

    console.log(req.body)

    next();
}
exports.createReview = handler.createOne(Review);
// UPDATE REVIEW
exports.updateReview = handler.updateOne(Review);
// DELETE REVIEW
exports.deleteReview = handler.deleteOne(Review);
