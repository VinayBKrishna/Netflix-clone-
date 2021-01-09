const express = require("express");
const router = express.Router();
const userCltr = require("../App/controller/userController");
const {authenticateUser} = require("../App/middlewares/auth");
const {adminAuth} = require("../App/middlewares/auth");

const multer = require("multer");
const moviesCltr = require("../App/controller/movieCltr");
const tvShowCltr = require("../App/controller/tvShowCltr");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/user/register", userCltr.register);
router.post("/user/login", userCltr.login);
router.get("/user/account", authenticateUser, userCltr.account);

//movies
router.get("/movie", authenticateUser, moviesCltr.show);
router.get("/showmovie/:id", authenticateUser, moviesCltr.showOne);
router.post(
  "/addmovie",
  authenticateUser,
  adminAuth,
  upload.array("netflix", 2),
  moviesCltr.create
);
router.put(
  "/updatemovie/:id/:public_id",
  authenticateUser,
  adminAuth,
  upload.single("netflix"),
  moviesCltr.update
);
router.delete("/delete/:id", authenticateUser, adminAuth, moviesCltr.delete);

//tv show
router.get("/tvshow", authenticateUser, tvShowCltr.show);
router.get("/tvshow/:id", authenticateUser, tvShowCltr.showOne);
router.post(
  "/addtvshow",
  authenticateUser,
  adminAuth,
  upload.array("netflix", 30),
  tvShowCltr.create
);
router.put(
  "/updatetvshow/:id/:public_id",
  authenticateUser,
  adminAuth,
  upload.single("netflix"),
  tvShowCltr.update
);
router.post(
  "/addone/:id",
  authenticateUser,
  adminAuth,
  upload.single("netflix"),
  tvShowCltr.addOne
);
router.delete(
  "/deletetvshow/:id",
  authenticateUser,
  adminAuth,
  tvShowCltr.delete
);
router.delete(
  "/deleteone/:id/:public_id",
  authenticateUser,
  adminAuth,
  tvShowCltr.deleteOne
);

// router.delete("/deleteAll", moviesCltr.deletaAll);
router.delete("/deleteAllTv", tvShowCltr.deleteAll);

module.exports = router;
