const express= require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema} =require("../schema.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')


const {signature} = require("../cloudConfig.js");
const upload = multer({ signature });

 

 router
 .route("/")
 .get(wrapAsync(listingController.index))
//  .post(validateListing,isLoggedIn, wrapAsync(listingController.createListing)
// );

.post(upload.single('listing[image]'),(req,res) => {
  res.send(req.file);
})

 // new route
 router.get("/new",isLoggedIn,(listingController.renderNewForm)
 );


 router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)
);



 //Edit
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)
  
);


module.exports = router;
