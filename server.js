const express= require('express')
const app= express()
const connectDB = require('./db/Connection')

connectDB()
app.use(express.json({extended: false}))
app.use('/api/personModel',require('./Api/Person'));
const port =5000
app.listen( port,(err)=> {
    err ? console.log(err) : console.log(`the server is running on port ${port}`)
})
