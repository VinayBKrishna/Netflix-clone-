const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        minlength:6,
        maxlength:64,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email or password'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128
    },
    role:{ type: String, default: 'admin' }
})

const User = mongoose.model('User',userSchema)

module.exports = User