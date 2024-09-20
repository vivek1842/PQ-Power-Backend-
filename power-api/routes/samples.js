const express = require('express'); //import express
const router = express.Router(); //import Express Router of express

const Product = require('../models/sample.js');
const mongoose = require('mongoose');

// router.get('/products')   //if we write this it'll be /products/products as we've already call /products in app.js
router.get('/',(req, res, next) => {
    
    console.log("get");
    Product.find()
    .exec() //this is promise... If we don't use that then we'd have to pass call here one is error and other is result i.e. successful operation of that method 
    .then(data => {
        const response = {
            counts : data.length,
            samples : data
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


router.get('/freq_red',(req, res, next) => {
    

    Product.findOne({ "Frequency_avg": { "$lt": 49.2} })
    .exec() //this is promise... If we don't use that then we'd have to pass call here one is error and other is result i.e. successful operation of that method 
    .then(data => {
        const response = {
            counts : data.length,
            samples : data
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/freq_yellow',(req, res, next) => {
    

    Product.findOne({ "Frequency_avg": { "$gt": 49.2, "$lt": 49.5 } })
    .exec() //this is promise... If we don't use that then we'd have to pass call here one is error and other is result i.e. successful operation of that method 
    .then(data => {
        const response = {
            counts : data.length,
            samples : data
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


router.get('/:sampleId',(req, res, next) => {
   const id = req.params.sampleId;
   Product.findById(id)
   .exec()
   .then(doc => {
    console.log("From database",doc);
    if(doc) {
        res.status(200).json({doc});
    } else {
        res.status(404).json({
            message: "No valid entry found for provied ID"
        })
    }
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
   });
   
});



router.delete('/:sampleId',(req, res, next) => {
   
   const id = req.params.sampleId;
//    Product.remove({ _id: id })   //remove() function is deprecated, now you may use deleteOne() or deleteMany() functions instead of that
    Product.deleteOne({_id: id})
   .exec()
   .then(result => {
    res.status(200).json(result);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
   });
});

module.exports = router; //router is exported and can be used in other files