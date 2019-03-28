const express = require('express')
const app = express();
const request = require('request');
const rp = require('request-promise');
const https = require('https');
const axios = require('axios');

const url = 'https://ehyqu8158e.execute-api.us-east-1.amazonaws.com/DEV/pets';

//Start Callback Request
 var getPets = function(callback) {
    request(url, (error,response,body) => {
        if(error) {
            console.log(error);
        } else {
        callback(JSON.parse(body));
        }
     });
}
var getPetById = function(id, callback) {
    request(`${url}/${id}`, (error, response, body) =>{
        if(error) {
            console.log(error);
        } else {
        callback(JSON.parse(body));
        }
    })  
}

app.get('/pets', (req,res) => {
    console.log('Executando chamada sincrona com callback');
    getPets((response) => res.send(response)); 
})

app.get('/pets/:petId', (req,res) => {
    var petId = req.params.petId;
    console.log('Executando chamada sincrona com callback')
    getPetById(petId, (cbresponse) => res.send(cbresponse));
})
//End Callback Request

//Start request promise
function getPets(){
    return new Promise((resolve,reject) =>{
        const result = request(url, (error, response,body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}
function getPetById(id){
    return new Promise((resolve,reject) => {
        const result = request(`${url}/${id}`, (error,response, body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}
app.get('/pets',(req,res) => {
    getPets().then((result) => {
        console.log('Executando chamada asincrona com Promise')
        res.send(result);
    })
})
app.get('/pets/:petId', (req,res) => {
    var petId = req.params.petId;
    getPetById(petId).then((result) => {
        console.log('Executando chamada asincrona com Promise')
        res.send(result);
    })
})
//End request promise

//Start async functions
async function getPets(){
    return new Promise((resolve,reject)=>{
        const result = request(url, async (error,response,body)=>{
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}


async function getPetById(id){
    return new Promise((resolve,reject) =>{
        const result = request(`${url}/${id}`, async (error, response,body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}

app.get('/pets', async (req,res) => {
    const result = await getPets();
    console.log('Executando chamada asincrona com Async/await')
    res.send(result);
});


app.get('/pets/:petId', async (req,res) => {
    const petId = req.params.petId;
    const result = await getPetById(petId);
    console.log('Executando chamada asincrona com Async/await')
    res.send(result);
});
//end async functions

module.exports = app;