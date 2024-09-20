const express = require('express');

const dotenv = require('dotenv');

const bodyParser = require('body-parser'); 

const mongoose = require('mongoose'); 

dotenv.config();
const app = express(); 


mongoose.connect(process.env.mongodb_url).then( (result) => {
    console.log('Database Connected');
}).catch( (err) => {
    console.log(err);
})

const sampleRoutes = require('./power-api/routes/samples.js');

const morgan = require('morgan'); 

app.use(morgan('dev'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    if(req.method === 'OPTIONS') {  
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET, DELETE'); 
        return res.status(200).json({});
    }
    next(); 
});

/*
    Routes which should handle request
*/
app.use("/sample",sampleRoutes);

app.use((req,res,next) => {
    console.log("Check");
    res.status(200).json({
        msg : "Working"
    })
})

//Error Handling
app.use((req,res,next) => { 
    const error = new Error('Not Found'); 
    error.status = 404; 
    next(error); 
});

app.use((error, req, res, next) => { 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app; 