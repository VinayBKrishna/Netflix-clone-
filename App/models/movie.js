const mongoose = require('mongoose')

const Schema = mongoose.Schema
const movieSchema = new Schema({
    movieTitle : {
        type:String
    },
    genre:{
        type:Array
    },
    rating:{
        type:Number
    },
    description : {
        type:String
    },
    photos : {
        type:Object
    },
    videos:{
        type:Object
    },
    createdAt : {
        type:Date,
        default:Date.now()
    }
})

const Movies = mongoose.model("Movies",movieSchema)

module.exports = Movies