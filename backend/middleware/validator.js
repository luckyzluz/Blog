/**
 * 后端验证模块
 */
// const express = require('express');
const { validationResult, buildCheckFunction } = require('express-validator');
// const { isValidObjectId } = require('mongoose')
// can be reused by many routes

// parallel processing
exports = module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    let err_result=errors.array()
    // err_result.forEach(v=>{
      // delete v.param
      // delete v.location
    // })
    
    res.status(200).json({ 
      code: 40000,
      success: false,
      errors: err_result
     });
  };
};

// exports.isValidObjectId = (location, fields) =>{
//   return buildCheckFunction(location)(fields).custom(async value => {
//     if(!isValidObjectId(value)){
//       return Promise.reject('ID 不是一个有效的 ObjectID')
//     }
//   })
// }

