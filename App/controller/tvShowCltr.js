const TvShows = require("../models/tv");
const tvShowCltr = {};
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "drhewzpgi",
  api_key: "482598416759954",
  api_secret: "juRtu-eZYVIBWyEaM2xFM0L7Fcw",
});

tvShowCltr.show = (req, res) => {
  TvShows.find({}, null, {
    sort: {createdAt: -1},
  })

    .then((tv) => {
      res.json(tv);
    })
    .catch((err) => {
      res.json(err);
    });
};

tvShowCltr.create = (req, res) => {
  const file = req.files;
  const body = req.body;
  let videoFile = [];

  let count = 0;
  console.log(body, "body from ctrl", file, "file from ctrl");
  file.map((type) => {
    if (type.mimetype.includes("image")) {
      count++;
      cloudinary.uploader.upload(type.path, (result) => {
        req.resultOfImage = result;
        console.log(req.resultOfImage, "photo");
      });
      console.log("image123");
    }
    if (type.mimetype.includes("video")) {
      console.log(type.originalname, "name");
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
            videoFile.push(result);
          } else {
            res.json(error);
          }

          count++;
          console.log(
            count,
            "after video upload",
            videoFile.length,
            "total file length",
            file.length
          );
          if (req.resultOfImage) {
            console.log("in if 1");
            if (videoFile.length == file.length - 1) {
              console.log("in if 2");
              const tv = new TvShows({
                videos: videoFile,
                photos: req.resultOfImage,

                ...body,
              });
              console.log(tv);
              tv.save()

                .then((tv) => {
                  res.json(tv);
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

tvShowCltr.addOne = (req, res) => {
  const id = req.params.id;
  const file = req.file;
  console.log(file);
  if (file.mimetype.includes("video")) {
    cloudinary.v2.uploader.upload(
      file.path,
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
        console.log(result);
        if (result) {
          TvShows.findOneAndUpdate(
            {_id: id},
            {$addToSet: {videos: result}},
            {new: true, runValidators: true}
          )
            .then((updated) => {
              res.json(updated);
            })
            .catch((err) => {
              res.json(err);
            });
        }
      }
    );
  }
};

tvShowCltr.update = (req, res) => {
  const id = req.params.id;
  const public_id = req.params.public_id;
  const file = req.file;
  const body = req.body;
  let videoFile = [];
  let newBody;

  console.log(id, public_id, "from update");
  TvShows.findOne({
    _id: id,
  })
    .then((show) => {
      console.log(show, "the show");
      console.log(file, "to be uploaded");
      if (show.photos.public_id == public_id) {
        console.log("photos part");
        console.log(`its ${show.photos.resource_type}`, show.photos, "photos");
        cloudinary.v2.uploader.upload(
          file.path,
          {
            resource_type: "image",
            public_id: public_id,
          },
          function (error, result) {
            req.resultOfImageUpdated = result;
            console.log(req.resultOfImageUpdated, "photo");
            newBody = {
              photos: req.resultOfImageUpdated,

              videos: show.videos,
              ...body,
            };
            console.log(newBody);
            if (req.resultOfImageUpdated) {
              TvShows.findOneAndUpdate(
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
            }
          }
        );
      } else {
        show.videos.map((videos) => {
          if (videos.public_id == public_id) {
            console.log(`its ${videos.resource_type}`);
            console.log(file, "to upload");
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
                videoFile.push(result);
                console.log("videoFile in if", videoFile);
                console.log(
                  videoFile.length,
                  "vid file",
                  show.videos.length,
                  "total length"
                );
                if (result) {
                  newBody = {
                    videos: videoFile,
                    photos: show.photos,

                    ...body,
                  };
                  TvShows.findOneAndUpdate(
                    {_id: id},
                    {$set: newBody},
                    {new: true, runValidators: true}
                  )
                    .then((updated) => {
                      console.log("update", updated);
                      res.json(updated);
                    })
                    .catch((err) => {
                      res.json(err);
                    });
                }
              }
            );
          } else {
            videoFile.push(videos);
            console.log(videoFile, "in else videoFile");
          }
          console.log(
            videoFile.length,
            "vid file",
            show.videos.length,
            "total length"
          );
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

tvShowCltr.showOne = (req, res) => {
  const id = req.params.id;
  TvShows.findOne({
    _id: id,
  })
    .then((tv) => {
      if (!tv) {
        res.json({});
      }
      res.json(tv);
    })
    .catch((err) => {
      res.json(err);
    });
};

tvShowCltr.delete = (req, res) => {
  const id = req.params.id;
  TvShows.findOne({
    _id: id,
  })
    .then((tv) => {
      console.log(tv, "from delete");
      cloudinary.v2.uploader.destroy(
        tv.photos.public_id,
        function (error, result) {
          console.log(result, error);
        }
      );
      tv.videos.map((episode) => {
        cloudinary.v2.uploader.destroy(
          episode.public_id,
          {resource_type: "video"},
          function (error, result) {
            console.log(result, error);
            if (result) {
              TvShows.findOneAndDelete({
                _id: id,
              })
                .then((tvShow) => {
                  if (!tvShow) {
                    res.json({});
                  }
                  res.json(tvShow);
                })
                .catch((err) => {
                  res.json(err);
                });
            }
          }
        );
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

tvShowCltr.deleteOne = (req, res) => {
  const id = req.params.id;
  const public_id = req.params.public_id;
  TvShows.findOne({
    _id: id,
  }).then((show) => {
    show.videos.map((videos) => {
      if (videos.public_id == public_id) {
        cloudinary.v2.uploader.destroy(
          public_id,
          {resource_type: "video"},
          function (error, result) {
            console.log(result);
            if (result) {
              TvShows.findByIdAndUpdate(
                {_id: id},
                {$pull: {videos: {public_id}}},
                {new: true, runValidators: true}
              )
                .then((updated) => {
                  res.json(updated);
                })
                .catch((err) => {
                  res.json(err);
                });
            }
          }
        );
      }
    });
  });
};

tvShowCltr.deleteAll = (req, res) => {
  TvShows.deleteMany({}).then((obj) => {
    res.json(obj);
  });
};

module.exports = tvShowCltr;
