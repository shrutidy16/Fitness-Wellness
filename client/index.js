const express = require('express');
const app = express();
const path = require ('path');
app.use(express.static("./Public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.get("/FitnessTv",function(rq,res){
    res.sendFile(__dirname+"/tv.html")
});

app.listen(3000, function(){

})