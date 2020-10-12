const express = require('express');
const router = express.Router();
//3. Configuration here
const dotenv = require('dotenv').config();
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
const unsplash = new Unsplash({ accessKey: process.env.myAccessKey });



//4. add API here
router.post('/api/searchPhotos', (req, res) => {

        //PUT YOUR CODE HERE
        let { keyword } = req.body;
        unsplash.search.photos(keyword)
            .then(toJson)
            .then(json => {
                res.status(200).send(json)
            })
            .catch((err) => {
                console.log("Error Message -->", err);
                res.status(200).send({ "messageError": err })
            });



});
router.post('/api/searchUser', (req, res) => {
    //PUT YOUR CODE HERE
    let { username } = req.body;
    unsplash.users.profile(username,1)
        .then(toJson)
        .then(json => {
            res.status(200).send(json)
        })
        .catch((err) => {
            console.log("Error Message -->", err);
            res.status(200).send({ "messageError": err })
        });
    });

    
    router.post('/api/photo', (req, res) => {
        //PUT YOUR CODE HERE
        let { username } = req.body;
        unsplash.users.photos(username, 1, 10, "latest")
        .then(toJson)
        .then(json => {
          // Your code
        })
            .catch((err) => {
                console.log("Error Message -->", err);
                res.status(200).send({ "messageError": err })
            });
        });


module.exports = router;