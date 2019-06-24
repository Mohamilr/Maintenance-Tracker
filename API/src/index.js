const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res)=>{
    return res.json({message:"it will work"})
})

app.listen(port, ()=>{
    console.log(`app is running on port `);
})