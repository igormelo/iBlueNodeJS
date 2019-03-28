const express = require('express')
const app = express();
const request = require('request');
const rp = require('request-promise');
const https = require('https');
const axios = require('axios');

const url = 'https://ehyqu8158e.execute-api.us-east-1.amazonaws.com/DEV/pets';

//Start Callback Request
 module.exports = getCallbackPets = function(callback) {
    request(url, (error,response,body) => {
        if(error) {
            console.log(error);
        } else {
        callback(JSON.parse(body));
        }
     });
}
module.exports = getCallbackPetById = function(id, callback) {
    request(`${url}/${id}`, (error, response, body) =>{
        if(error) {
            console.log(error);
        } else {
        callback(JSON.parse(body));
        }
    })  
}

//End Callback Request

//Start request promise
module.exports = getPromisePet = function(){
    return new Promise((resolve,reject) =>{
        const result = request(url, (error, response,body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}
module.exports = getPromisePetById = function (id){
    return new Promise((resolve,reject) => {
        const result = request(`${url}/${id}`, (error,response, body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}

// End request promise

// Start async functions
module.exports = getAsyncPet = async function(){
    return new Promise((resolve,reject)=>{
        const result = request(url, async (error,response,body)=>{
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}


module.exports = getAsyncPetById = async function(id){
    return new Promise((resolve,reject) =>{
        const result = request(`${url}/${id}`, async (error, response,body) => {
            resolve(JSON.parse(body));
            reject(error => console.log(error));
        })
        return result;
    })
}

//end async functions

module.exports = app;