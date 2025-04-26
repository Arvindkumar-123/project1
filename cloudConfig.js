// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name:process.env.CLOUD_NAME,
//     api_key:process.env.CLOUD_API_KEY,
//     api_secret:process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'Wanderlust_DEV',
//       allowerdFormats: ['png','jpg','jpeg'],
//     },
//   });

//   module.exports = {
//     cloudinary,
//     storage,
//   };
const crypto = require('crypto');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
});

// This should come from your frontend
const timestamp = Math.floor(Date.now() / 1000);
const folder = "Wanderlust_DEV";

const signature = crypto
  .createHash('sha1')
  .update(`folder=${folder}&timestamp=${timestamp}${cloudinary.config().api_secret}`)
  .digest('hex');

console.log(signature); // send this to frontend

module.exports={
signature 
}