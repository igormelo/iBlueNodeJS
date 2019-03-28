const port = 3000;
const app = require('./services/service');


app.get('/cb-pets', (req,res) => {
    console.log('Executando chamada sincrona com callback');
    getCallbackPets((cbresponse) => res.send(cbresponse));
})

app.get('/cb-pets/:cbPetId', (req,res) => {
    var cbPetId = req.params.cbPetId;
    console.log('Executando chamada sincrona com callback')
    getCallbackPetById(cbPetId, (cbresponse) => res.send(cbresponse));
})


app.get('/promise-pets',(req,res) => {
    getPromisePet().then((result) => {
        console.log('Executando chamada asincrona com Promise')
        res.send(result);
    })
})
app.get('/promise-pets/:promisePetId', (req,res) => {
    var promisePetId = req.params.promisePetId;
    getPromisePetById(promisePetId).then((result) => {
        console.log('Executando chamada asincrona com Promise')
        res.send(result);
    })
})


app.get('/async-pets', async (req,res) => {
    const result = await getAsyncPet();
    console.log('Executando chamada asincrona com Async/await')
    res.send(result);
});


app.get('/async-pets/:asyncPetId', async (req,res) => {
    const asyncPetId = req.params.asyncPetId;
    const result = await getAsyncPetById(asyncPetId);
    console.log('Executando chamada asincrona com Async/await')
    res.send(result);
});

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`server is running on ${port} port`)
    }
})