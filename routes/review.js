const express= require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/review.Js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor }=require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");



// review post Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.createReview)
);

//Delete Review Route

router.delete(
    "/:reviewId",isLoggedIn,isReviewAuthor ,
    wrapAsync(reviewControllers.destroyReview)
  );

  module.exports = router;
  
