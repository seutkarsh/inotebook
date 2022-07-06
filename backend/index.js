//Module Imports
const connectToDatabase = require('./db');
const express = require('express');
const app=express();


connectToDatabase();

const port=5000;
app.get('/',(req,res)=>{

console.log("Hello World")
});

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})
