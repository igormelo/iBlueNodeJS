const express = require('express')
const port = 3000;
const app = require('./services/service');



app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`server is running on ${port} port`)
    }
})