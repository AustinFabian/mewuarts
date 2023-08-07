const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/AppError');

const APIFeatures = require('./../utils/APIfeatures');

const Review = require('../model/reviewModel');



// FOR DELETING OF ANY SORT
exports.deleteOne = (Model, type) => catchAsync(async(req,res,next)=>{

  var doc
  
  if(type === 'user'){
    doc = await Model.findByIdAndDelete(req.params.id);
    await Review.deleteMany({"user": req.params.id});
  }else if(type === 'tour'){
    doc = await Model.findByIdAndDelete(req.params.id);
    await Review.deleteMany({"tour": req.params.id});
  }else{
    doc = await Model.findByIdAndDelete(req.params.id);
  }

    

  if(!doc){
    return next(new AppError(`No document found with that ID`,404))
  }

  res.status(200).json({
    status: 'success',
    data: null
  });
});

// FOR UPDATING OF ANY SORT
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
});

// FOR CREATION OF ANY SORT
exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
});

// FOR GETTING ANY PARTICULAR DOCUMENT THROUGH OUT THE DATABASE
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
});

//FOR GETTING ALL DOCUMENT IN ANY OF THE DATABASE COLLECTION 
exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });
