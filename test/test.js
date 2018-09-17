"use strict";

const assert = require("assert");
const moduleTest = require("../");

var tokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Yjk5YTBlODhmZTA0ZDM5YjRjZjAzNTMiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MzcyMTk2ODUsImVtYWlsIjoiYWRtaW5AYWRtaW4iLCJleHAiOjE1MzcyMjMyODUsImlzcyI6ImZ1bmN0aW9ucy1pbyJ9.Yl_4QV7W7IjVFTH41wSPIAcJcvLK8aQ2mLp7Nu-aWBo";

moduleTest(tokenJWT).then(function(result){
    assert.strictEqual(typeof(result), "object");
}, function(err){
    assert.strictEqual(err, null);
})