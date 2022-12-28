const express = require('express');
const app = express();
const Quote = require('inspirational-quotes'); 
const {PORT} = require('./src/configs/constants');
const routerStocks = require('./src/routers/stocks');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-with, Content-Type, Accept');
    next();
});
app.get('/',(req, res)=>{
     res.send(Quote.getQuote());
});
app.use('/stocks', routerStocks);
app.listen(PORT,()=>{
    console.log(`running port at ${PORT}.`)
});