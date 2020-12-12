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

            if(error) return res.send({
                success:false,
                message:"Error getting oauth token"
            });

            //else we extract the token from the body

            let token = JSON.parse(body)['access_token'];

            req.token = token;
            
            next();
        })
    }

    getTimestamp(){
        return "wow!!"
    }

    lipaNaMpesaOnline(req,res){
        let token = req.token;
        let auth = `Bearer ${token}`;
        let url = process.env.lipa_na_mpesa_url;

        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;
        
        let bs_short_code = process.env.lipa_na_mpesa_shortcode;
        let passkey = process.env.lipa_na_mpesa_passkey;

        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1";
        let partyA = "254723546223";
        let partyB = process.env.lipa_na_mpesa_shortcode;
        let phoneNumber = "254723546223";
        let callBackUrl = "http://17e2c2f08166.ngrok.io/mpesa/lipa-na-mpesa-callback";
        let accountReference = "123test";
        let transaction_desc = "Giving a tutorial on using lipa na mpesa online";

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
                message:"Error processing your request"
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

        return res.send({
            success:true,
            message
        })
    }

};

module.exports = new MpesaController();