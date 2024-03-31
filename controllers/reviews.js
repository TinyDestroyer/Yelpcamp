const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    req.flash('success', "New Review Created");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req,res) => {
    const {id, reviewsId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : {reviews : reviewsId}});
    await Review.findByIdAndDelete(reviewsId);
    req.flash('success', "Successfully Deleted a Review");
    res.redirect(`/campgrounds/${id}`);
}