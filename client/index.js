const express = require('express');
const app = express();
const path = require ('path');
app.use(express.static("./Public"));


require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;

const client = require('twilio')(accountSid, authToken);

client.notify.services(notifyServiceSid).notifications.create({
   toBinding: JSON.stringify({
       binding_type: 'sms', address: '+919546071294',
       binding_type: 'sms', address:'+918920675678'
   }),
   body: 'Have a break and take a deep breath!!!'
})
.then(notification => console.log(notification.sid))
.catch(error => (console.log));




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
app.listen(3000, function(){

})