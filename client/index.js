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
app.get("/MentalWellnessTv",function(rq,res){
    res.sendFile(__dirname+"/welltv.html")
});
app.get("/BMIcalc",function(rq,res){
    res.sendFile(__dirname+"/bmi.html")
});
app.get("/BMIcalcMetric",function(rq,res){
    res.sendFile(__dirname+"/bmi2.html")
});
app.listen(3000, function(){

})