const Movies = require("../models/movie");
const moviesCltr = {};
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: "drhewzpgi",
  api_key: "482598416759954",
  api_secret: "juRtu-eZYVIBWyEaM2xFM0L7Fcw",
});

moviesCltr.show = (req, res) => {
  Movies.find({}, null, {
    sort: {createdAt: -1},
  })

    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      res.json(err);
    });
};

moviesCltr.create = (req, res) => {
  const file = req.files;
  const body = req.body;
  console.log(body, "body", file, "file");
  console.log(body.rating);
  file.map((type) => {
    if (type.mimetype.includes("image")) {
      cloudinary.uploader.upload(type.path, (result) => {
        req.resultOfImage = result;
        console.log(req.resultOfImage, "photo");
      });
      console.log("image123");
    }
    if (type.mimetype.includes("video")) {
      cloudinary.v2.uploader.upload(
        type.path,
        {
          resource_type: "video",
          public_id: `${Date.now()}`,
          chunk_size: 6000000,

          eager: [
            {width: 300, height: 300, crop: "pad", audio_codec: "none"},
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
          if (result) {
            if (req.resultOfImage) {
              const movie = new Movies({
                videos: result,
                photos: req.resultOfImage,

                ...body,
              });
              console.log(movie);
              movie
                .save()
                .then((movie) => {
                  res.json(movie);
                  //fs.unlink(movie.photos)
                })
                .catch((err) => {
                  res.json(err);
                });
            }
          }
        }
      );
      console.log("video123");
    }
  });
};

moviesCltr.showOne = (req, res) => {
  const id = req.params.id;
  Movies.findOne({
    _id: id,
  })
    .then((movie) => {
      if (!movie) {
        res.json({});
      }
      res.json(movie);
    })
    .catch((err) => {
      res.json(err);
    });
};

moviesCltr.update = (req, res) => {
  const id = req.params.id;
  const public_id = req.params.public_id;
  const body = req.body;
  const file = req.file;
  let newBody;
  console.log(id, public_id, "from update");
  console.log(body, "body");
  console.log(file, "file");
  Movies.findById({
    _id: id,
  })
    .then((movie) => {
      if (movie.photos.public_id == public_id) {
        cloudinary.v2.uploader.upload(
          file.path,
          {
            resource_type: "image",
            public_id: public_id,
            overwrite: true,
          },
          function (error, result) {
            if (result) {
              console.log(result, "imgae updated");
              newBody = {
                photos: result,
                videos: movie.videos,
                ...body,
              };
              console.log(newBody);
              Movies.findOneAndUpdate(
                {_id: id},
                {$set: newBody},
                {new: true, runValidators: true},
                function (err, result) {
                  if (err) {
                    res.send(err);
                  } else {
                    console.log(result, "result");
                    res.send(result);
                  }
                }
              );
            }
          }
        );
      } else if (movie.videos.public_id == public_id) {
        console.log(`its ${movie.videos.resource_type} `, file);
        console.log("videos part");
        cloudinary.v2.uploader.upload(
          file.path,
          {
            resource_type: "video",
            public_id: public_id,
            chunk_size: 6000000,
            eager: [
              {width: 300, height: 300, crop: "pad", audio_codec: "none"},
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
            req.resultOfUpdatedVideo = result;
            if (req.resultOfUpdatedVideo) {
              newBody = {
                videos: req.resultOfUpdatedVideo,

                photos: movie.photos,
                ...body,
              };
              console.log(newBody, "from video this thihng");
              Movies.findOneAndUpdate(
                {_id: id},
                {$set: newBody},
                {new: true, runValidators: true}
              )
                .then((updated) => {
                  res.json(updated);
                })
                .catch((err) => {
                  res.json(err);
                });
            } else {
              res.json(error);
            }
          }
        );
      } else {
        res.json("something went wrong");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

moviesCltr.delete = (req, res) => {
  const id = req.params.id;
  Movies.findOne({
    _id: id,
  })
    .then((movie) => {
      console.log(movie, "from delete");
      console.log(movie.videos.public_id, "from delete videos");
      console.log(movie.photos.public_id, "from delete photos");
      cloudinary.v2.uploader.destroy(
        movie.videos.public_id,
        {resource_type: "video"},
        function (error, result) {
          console.log(result, error);
        }
      );
      cloudinary.v2.uploader.destroy(
        movie.photos.public_id,
        function (error, result) {
          console.log(result, error);
          if (result) {
            Movies.findOneAndDelete({
              _id: movie._id,
            })
              .then((movie) => {
                if (!movie) {
                  res.json({});
                }
                res.json(movie);
              })
              .catch((err) => {
                res.json(err);
              });
          }
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
};

moviesCltr.deletaAll = (req, res) => {
  Movies.deleteMany({}).then((obj) => {
    res.json(obj);
  });
};

module.exports = moviesCltr;
