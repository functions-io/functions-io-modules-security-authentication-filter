"use strict";

const jwt = require("jsonwebtoken");

module.exports.config = {
    secretOrPrivateKey : "aaaa",
    algorithm : "HS256",
    issuer: "functions-io",
    whiteList : ["@functions-io-modules/security.token.generate"]
};

module.exports.process = function(message, context){
    return new Promise(function (resolve, reject){
        try {
            if (context && context.moduleName){
                if (context.parentContext){
                    resolve(null);
                    return;
                }

                if (module.exports.config.whiteList.indexOf(context.moduleName) > -1){
                    resolve(null);
                    return;
                }

                if (context.security){
                    if (context.security.tokenUser){
                        resolve(context.security.tokenUser);
                        return;
                    }
                    else if (context.security.credentials){
                        let tokenJWT = context.security.credentials;
                        let opt = {};
                        opt.algorithm = module.exports.config.algorithm;
                        //opt.expiresIn = module.exports.config.expiresIn;
                        opt.issuer = module.exports.config.issuer;
        
                        jwt.verify(tokenJWT, module.exports.config.secretOrPrivateKey, opt, function(errVerify, tokenUser){
                            try {
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
                            }
                            catch (errTry2) {
                                reject(errTry2);
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
                    let errObj = {};
                    errObj.code = 401;
                    errObj.name = "FunctionsErrorSecurityUnauthorized";
                    errObj.data = {};
                    errObj.data.message = "Credential required";
                    reject(errObj);
                }
            }
            else{
                let errObj = {};
                errObj.code = 401;
                errObj.name = "FunctionsErrorSecurityUnauthorized";
                errObj.data = {};
                errObj.data.message = "Internal context and moduleName attribute required";
                reject(errObj);
            }
        }
        catch (errTry) {
            reject(errTry);
        }
    });
};