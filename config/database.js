const mongoose = require('mongoose')

const configDB = ()=>{
    mongoose.connect('mongodb://localhost:27017/Netflix',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('error connecting to db')
    })
}

module.exports = configDB