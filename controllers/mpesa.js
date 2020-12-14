const request = require('request');
require('dotenv').config();

class MpesaController {

    getOAuthToken(req,res,next){
        let consumer_key = process.env.consumer_key;
        let consumer_secret = process.env.consumer_secret;

        let url = process.env.oauth_token_url;

        //form a buffer of the consumer key and secret
        let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;

        request({
            url:url,
            headers:{
                "Authorization":auth
            }
        },(error,response,body) => {

            if(error) {
                return res.send({
                    success:false,
                    message:"Error getting oauth token"
                });
            };

            //else we extract the token from the body

            let token = JSON.parse(body)['access_token'];

            req.token = token;
            
            return next();
        });
    };

    lipaNaMpesaOnline(req,res){
        let token = req.token;
        let auth = `Bearer ${token}`;
        

        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;

        let url = process.env.lipa_na_mpesa_url;
        let bs_short_code = process.env.lipa_na_mpesa_shortcode;
        let passkey = process.env.lipa_na_mpesa_passkey;

        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1"; //you can enter any amount
        let partyA = "your_phone_number"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.lipa_na_mpesa_shortcode;
        let phoneNumber = "your_phone_number"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "{{your_ngrok_url}}/mpesa/lipa-na-mpesa-callback";
        let accountReference = "lipa-na-mpesa-tutorial";
        let transaction_desc = "Testing lipa na mpesa functionality";

        request({
            method:'POST',
            url,
            headers:{
                'Authorization':auth
            },
            json:{
                "BusinessShortCode":bs_short_code,
                "Password":password,
                "Timestamp":timestamp,
                "TransactionType":transcation_type,
                "Amount":amount,
                "PartyA":partyA,
                "PartyB":partyB,
                "PhoneNumber":phoneNumber,
                "CallBackURL":callBackUrl,
                "AccountReference":accountReference,
                "TransactionDesc":transaction_desc
            }
        },(error,response,body) => {

            if(error) return res.send({
                success:false,
                message:error
            });

            //else true


            return res.send({
                success:true,
                message:body
            })
        })
    };

    lipaNaMpesaOnlineCallback(req,res){
        
        let message = req.Body.stkCallback.ResultDesc;

        //based on the message you can update some records.

        return res.send({
            success:true,
            message
        });
        
    };

};

module.exports = new MpesaController();