const Movies = require('../models/movie')
const moviesCltr = {}
const cloudinary = require("cloudinary");


cloudinary.config({
    cloud_name: cloudname,
    api_key: apikey,
    api_secret: secretkey,
});

moviesCltr.show = (req,res)=>{
    Movies.find()
        .then((movies)=>{
            res.json(movies)
        })
        .catch((err)=>{
            res.json(err)
        })
}

moviesCltr.create = (req,res)=>{
    const file = req.files;
    const body = req.body
    console.log(body,'body',file ,'file')
    
  file.map((type) => {
    if (type.mimetype.includes("image")) {
      cloudinary.uploader.upload(type.path, (result) => {
        
        req.resultOfImage = result
        console.log(req.resultOfImage, "photo");
        
      });
    console.log('image123')
    }
    if (type.mimetype.includes("video")) {
      cloudinary.v2.uploader.upload(
        type.path,
        {
          resource_type: "video",
          public_id: `${Date.now()}`,
          chunk_size: 6000000,
          eager: [
            { width: 300, height: 300, crop: "pad", audio_codec: "none" },
            {
              width: 160,
              height: 100,
              crop: "crop",
              gravity: "south",
              audio_codec: "none",
            },
          ],
        },
        function (error, result) {
          console.log(result, error, "video");
          const movie = new Movies({
            videos: result,
            photos:req.resultOfImage,
            ...body

          });
          console.log(movie)
          movie
            .save()
            .then((movie) => {
              (res.json(movie));
            })
            .catch((err) => {
              res.json(err);
            });
            
        }
      );
    console.log('video123')
    }
  });

}


moviesCltr.showOne = (req,res)=>{
    const id = req.params.id
    Movies.findOne({
        _id : id
    }).then(movie =>{
        if(!movie){
            res.json({})
        }
        res.json(movie)
    })
    .catch((err)=>{
        res.json(err)
    })
}

moviesCltr.delete = (req,res)=>{
    const id = req.params.id
    Movies.findOne({
        _id:id
    }).then((movie)=>{
        console.log(movie,'from delete')
        // Cloudinary.Uploader.destroy(movie.videos.public_id)
        // Cloudinary.Uploader.destroy(movie.photos.public_id)
        console.log(movie.videos.public_id,'from delete videos')
        console.log(movie.photos.public_id,'from delete photos')
        cloudinary.v2.uploader.destroy(movie.videos.public_id, {resource_type: 'video'}, 
        function(error,result) {
            console.log(result, error) } );
        cloudinary.v2.uploader.destroy(movie.photos.public_id, 
        function(error,result) {
            console.log(result, error) })
        Movies.findOneAndDelete({
            _id : movie._id
        }).then(movie=>{
            if(!movie){
                res.json({})
            }
            res.json(movie)
        })
        .catch((err)=>{
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })

    // Movies.findByIdAndDelete({
    //     _id:id
    // }).then((movie)=>{
    //     //Cloudinary.Uploader.destroy(movie.public_id)
    //     res.json(movie)
    //     console.log(movie.public_id)
    // })
    // .catch((err)=>{
    //     res.json(err)
    // })

}



moviesCltr.deletaAll = (req,res) =>{
    Movies.deleteMany({})
        .then((obj)=>{
            res.json(obj)
        })
}


module.exports = moviesCltr