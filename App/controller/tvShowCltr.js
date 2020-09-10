const TvShows = require('../models/movie')
const tvShowCltr = {}
const cloudinary = require("cloudinary");


cloudinary.config({
    cloud_name: cloudname,
    api_key: apikey,
    api_secret: secretkey,
});

tvShowCltr.show = (req,res)=>{
    TvShows.find()
        .then((tv)=>{
            res.json(tv)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = tvShowCltr