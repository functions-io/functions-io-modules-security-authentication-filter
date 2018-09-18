"use strict";

const jwt = require("jsonwebtoken");

module.config = {
    secretOrPrivateKey : "aaaa",
    algorithm : "HS256",
    issuer: "functions-io"
};

module.input = {
    type: "string"
};

module.output = {
    type: "object"
};

module.exports = function(tokenJWT){
    return new Promise(function (resolve, reject){
        try {
            let opt = {};
            opt.algorithm = module.config.algorithm;
            //opt.expiresIn = module.config.expiresIn;
            opt.issuer = module.config.issuer;

            jwt.verify(tokenJWT, module.config.secretOrPrivateKey, opt, function(errVerify, tokenObj){
                if (errVerify){
                    let errObj = {};
                    errObj.code = 401;
                    errObj.name = "FunctionsSecurityUnauthorized";
                    errObj.data = errVerify;
                    reject(errObj);
                }
                else{
                    resolve(tokenObj);
                }
            });
        }
        catch (errTry) {
            reject(errTry);
        }
    });
};