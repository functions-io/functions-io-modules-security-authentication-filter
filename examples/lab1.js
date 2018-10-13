"use strict";

const moduleTest = require("../");

var message = {};

var context = {};
context.security = {};
context.security.credentials = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Yjk5YTBlODhmZTA0ZDM5YjRjZjAzNTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MzcyMTk2ODUsImVtYWlsIjoiYWRtaW5AYWRtaW4iLCJleHAiOjE1MzcyMjMyODUsImlzcyI6ImZ1bmN0aW9ucy1pbyJ9.Yl_4QV7W7IjVFTH41wSPIAcJcvLK8aQ2mLp7Nu-aWBo";
context.listModulesInvoked = ["module1"];

moduleTest.process(message, context).then(function(result){
    console.log("sucess! ", result);
}, function(err){
    console.log("err! ", err);
})