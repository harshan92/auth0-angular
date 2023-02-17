const express=require('express');
const app=express();
const path=require('path');

app.use('/', express.static(__dirname+'/'));


app.get('/*',(req, res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

const hostname='localhost';
const port=4200;

const server=app.listen(port, hostname, ()=>{
    console.log(`Server is listenning at http://${hostname}:${port}`);
})