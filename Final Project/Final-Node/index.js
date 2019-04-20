const express = require('express');
const bodyParser = require('body-parser');
//configuring the database
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const cors = require('cors');


//create express app
const app = express();
// parse requests of content-type - application/jso
app.use(bodyParser.json({limit :"25000000kb"}));

app.use(cors());


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log("successfully connnected to database")
}).catch(err =>{
    console.log("can not connect to database due to "+ err);
    process.exit();
});

// Require Notes routes
require('./route/app.route')(app);

app.listen('3000', ()=>{
    console.log('Server is listening on the port 3000')
})