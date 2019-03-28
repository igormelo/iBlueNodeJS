const express = require('express')
const app = express();
const request = require('request');
const rp = require('request-promise');

const url = 'https://ehyqu8158e.execute-api.us-east-1.amazonaws.com/DEV/pets';

//Start Callback Request
app.get('/pets', (req,res) => {
    request(url,(error, response, body) => {
        if (error) {
            console.error(error);
        } else {
        res.send(200, JSON.parse(body));
        }
    })
})

app.get('/pets/:petId', (req,res) => {
    var petId = req.params.petId;
    request(`${url}/${petId}`, (error, response, body) =>{
        if (error) {
            console.error(error);
        } else {
        res.send(200, JSON.parse(body));
        }
    })   
})
//End Callback Request

//Start request promise
app.get('/pets', (req,res) => { 
    rp(url).then((response) =>{
        res.send(JSON.parse(response));
    })
    .catch((error) =>{
        console.log(error);
    })
})
app.get('/pets:petId', (req,res) =>{
    rp(url).then((response) => {
        res.send(JSON.parse(response));
    })
    .catch((error) =>{
        console.log(error);
    })
})
//End request promise

module.exports = app;