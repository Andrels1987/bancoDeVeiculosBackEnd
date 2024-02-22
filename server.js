const express = require("express");
const path = require('path')
const mongoose = require('mongoose')
const app = express();
const connectDB = require('./config/dbConn')
const cors = require('cors')
const {pageRouter, userRouter} = require('./routes/pages-config-routes')
const apiRouter = require('./routes/api-application-routes');
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 3500
console.log("react app reached here server");
//CONNECTING TO MONGODB
connectDB();
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))


app.use("/", pageRouter)
app.use("/api", bodyParser.json(), apiRouter)

mongoose.connection.once('open', () =>{
    console.log("connected to mongodb");
    app.listen(PORT, () => console.log('listening on port ' + PORT))
})