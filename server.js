// HTTP Server
const express = require('express');
const dotenv = require('dotenv');    // this dotenv is used to hide credentials
const morgan = require('morgan');    // this allows us to log request on console when ever we make request
const bodyparser = require("body-parser");
const path = require('path');        // used to implement the path

const connectDB=require('./server/database/connection')

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

// Log request
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")
//  app.set("views",(path.reslove(__dirname,"views/ejs"))) //--> this line is used when ever we make our html or ejs files other than the views folder

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// load routers
app.use('/',require('./server/routes/router'))


app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})