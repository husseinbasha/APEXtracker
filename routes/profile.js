
//DEFINE DEPENDENCIES AND ROUTER AND NODE FETCH  
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//USING THE GET FUNCTION EXPRESS ROUTER 
//TAKE 2 PARAMETERS 1:REQUEST PARAMETERS
//                  2:ASYNC REQUEST AND 
//                    RESPONSE DEFINITION 
router.get('/:platform/:gamertag' , async(req ,res)=>{
    try {
        //1: STRUCTRING THE API KEY
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }
        //2: STRUCTRING REQUEST PARAMETERS
        const {platform,gamertag} = req.params;

        //3: FETCHING THE RESPONSE 
        //NOTE:**AWAIT IS USED BECAUSE OF ASYNC REQUEST AND RESPONSE**
        const  response = await fetch( `${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}` , {
            headers
        });

        //4: CONVERTING THE DATA TO JSON
        const data = await response.json();

        //5:SHOWING USER THAT PROFILE ISN'T FOUND BY THE APP
        if(data.errors && data.errors.length > 0){
            return res .status(404).json({
                message: 'Profile not found'
            });
        }

        //5: SENDING THE JSON AS A FINAL RESPONSE
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message : "server error"
        });
    }
});

module.exports = router ;