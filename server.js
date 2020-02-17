/**
 * author: HUSSEIN BASHA 
 * date: 2020/2/17
 * This app is written by following Traversy Media video of making an
 * APEX LEGENDS Tracker APP 
 * Using NODE.JS and VUE.JS
 * link to the video: https://www.youtube.com/watch?v=8z2qRln9tnc&t=231s
 */


 //DEFINING THE DPENDENCIES 
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//THIS WILL BE THE CONFIGURATION FILE THAT WILL HOLD
// **API KEY AND URL**//
dotenv.config({path: './config.env'});

//THIS WILL USE THE PORT THAT IS DEFINED IN CONFIG FILE AND SET THE PORT
//AS DEFINED OR WILL USE 8000 INSTED THERE ISN'T
const port = process.env.PORT || 8000;

//DEFINE EXPRESS APP
const app = express();

//THIS WILL LOG EVERY REQUEST 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//THIS WILL BE A ROUTE FILE THAT THE APP NEED TO USE FOR FETCHING PROFILE DATA
app.use('/api/v1/profile' , require('./routes/profile'));


//HANDLE PRODUCTION
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/ , (req,res) => res.sendFile('/public/index.html'));
    
}




//IF THE ROUTE ABOVE DOSENT WORK THIS WILL WORK INSTED
app.get('/api/v1/profile/:platform/:gamertag' , (req ,res)=>{
    console.log(req.params.platform , req.params.gamertag);
    res.send("hello");
});

//JUST LOGGING IN THE CONSOLE THAT THE APP IS RUNNING ON THE PORT DEFINED PREVIOUSLY
//AND ITS NODE ENVIROMENT 
app.listen(port, ()=> {
console.log(`app is listening on port ${port} and running on ${process.env.NODE_ENV}`);
});