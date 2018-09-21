"use strict";

const jwt = require("jsonwebtoken");

module.config = {
    secretOrPrivateKey : "aaaa",
    algorithm : "HS256",
    issuer: "functions-io",
    whiteList : ["@functions-io-modules/security.token.generate"]
};

module.exports = function(message, context){
    return new Promise(function (resolve, reject){
        try {
            if ((context) && (context.security) && (context.security.tokenUser)){
                resolve(context.security.tokenUser);
                return;
            }

            if (module.config.whiteList.indexOf(context.listModulesInvoked[0].moduleName) === -1){
                if ((context) && (context.security) && (context.security.credentials)){
                    let tokenJWT = context.security.credentials;
                    let opt = {};
                    opt.algorithm = module.config.algorithm;
                    //opt.expiresIn = module.config.expiresIn;
                    opt.issuer = module.config.issuer;
    
                    jwt.verify(tokenJWT, module.config.secretOrPrivateKey, opt, function(errVerify, tokenUser){
                        if (errVerify){
                            let errObj = {};
                            errObj.code = 401;
                            errObj.name = "FunctionsErrorSecurityUnauthorized";
                            errObj.data = errVerify;
                            reject(errObj);
                        }
                        else{
                            context.security.tokenUser = tokenUser;
                            Object.freeze(context.security); //security
                            Object.freeze(context.security.tokenUser); //security
                            resolve(tokenUser);
                        }
                    });
                }
                else{
                    let errObj = {};
                    errObj.code = 401;
                    errObj.name = "FunctionsErrorSecurityUnauthorized";
                    errObj.data = {};
                    errObj.data.message = "Credential required";
                    reject(errObj);
                }
            }
            else{
                resolve(null);
            }
        }
        catch (errTry) {
            reject(errTry);
        }
    });
};