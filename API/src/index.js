// import express
const express = require('express');

// initialize app
const app = express();

const port = 3000;

app.get('/', (req, res)=>{
    return res.json({message:'it will work'})
})

// listen to port
app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
})