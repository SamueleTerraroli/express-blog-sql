const express = require('express');
const app = express();
const port = 3000;

// import middleware
const notFoundEndpoint = require('./middlewares/notFoundEndpoint')
const errorsHandler = require('./middlewares/errorsHandler')

//import router
const postsRouter = require('./router/posts');

//middleware per asset statici
app.use(express.static('public'))

//middleware per il parsing del body
app.use(express.json())

//rotte
app.get('/', (req, res) => {
    res.send('server dei post');
})

//utilizzo il router
app.use('/posts', postsRouter);

// Middleware di gestione degli errori
app.use(notFoundEndpoint);
app.use(errorsHandler);


app.listen(port, () => {
    console.log(`Sono in ascolto alla porta ${port}`);

})