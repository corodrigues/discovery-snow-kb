'use strict'
const dotenv = require('dotenv').config();
const discovery = require('watson-developer-cloud/discovery/v1');
const request = require('request');

const wds = new discovery({
    username: process.env.wdsUser,
    password: process.env.wdsPw,
    version_date: '2017-11-07'
  });
console.log("Process started.");
request.get(process.env.snowUrl + '/api/now/table/kb_knowledge', (error, response, body) => {
    if(!error){
        const jsonBody = JSON.parse(body);
        console.log('Starting the upload process...');
    for(let elm in jsonBody.result){
        uploadJson(jsonBody.result[elm], ()=>{});
    }
    console.log("Success!");
  } else {
      console.log(error);
  }
}).auth(process.env.snowUser, process.env.snowPw);

function uploadJson(jsonObj, callback){
    setTimeout(() => {
        wds.addJsonDocument({ environment_id: process.env.wdsEnv, collection_id: process.env.wdsColl, file: jsonObj }, (error, data)=>{
            if (!error){
            } else {
                console.log(error);
            }
        }
        );    
    }, 500);
}