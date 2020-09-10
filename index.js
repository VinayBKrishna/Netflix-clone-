const express = require('express')
const cors = require('cors')
const app = express()

const configDB = require('./config/database')
const router = require('./config/routes')

const port = 3333

app.use(express.json())
configDB()
app.use(cors())
app.use(router)


app.use('/',router)


app.listen(port,()=>{
    console.log('server is listing on port',port)
})