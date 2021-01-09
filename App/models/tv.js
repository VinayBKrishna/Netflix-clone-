const mongoose = require('mongoose')

const Schema = mongoose.Schema
const tvSchema = new Schema({
    tvTitle:{
        type:String
    },
    genre:[{
        type:String
    }],
    rating:{
        type:Number
    },
    description:{
        type:String
    },
    photos:{
        type:Object
    },
    videos:{
        type:Array
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    
})


const TvShows = mongoose.model("TvShows",tvSchema)



module.exports = TvShows