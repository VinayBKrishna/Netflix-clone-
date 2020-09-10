const express = require('express')
const router = express.Router()
const userCltr = require('../App/controller/userController')
const {authenticateUser} = require('../App/middlewares/auth')

const multer = require('multer')
const moviesCltr = require('../App/controller/movieCltr')
const tvShowCltr = require('../App/controller/tvShowCltr')

const fileFilter = (req,file,cb)=>{
    if(file.mimetype=== 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype ==='video/mp4' ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

var upload = multer({ 
    storage: storage, 
    fileFilter:fileFilter
})


router.post('/user/register',userCltr.register)
router.post('/user/login',userCltr.login)
router.get('/user/account',authenticateUser,userCltr.account)

//movies
router.get("/movie",authenticateUser,moviesCltr.show)
router.get("/showmovie/:id",authenticateUser,moviesCltr.showOne)
router.post("/addmovie",authenticateUser,upload.array("netflix",2),moviesCltr.create)

router.delete('/delete/:id',authenticateUser,moviesCltr.delete)

//tv show
router.get("/tv-show",authenticateUser,tvShowCltr.show)


router.delete('/deleteAll',moviesCltr.deletaAll)

module.exports = router