/**
 * 文章数据验证
 */
 const {body, param} =require('express-validator')
 const validate = require('../middleware/validator')
 const MysqlMethods = require('../util/mysql')
 // const mongoose = require('mongoose')
 // const { Article } = require('../model')
 
 // 创建文章时验证数据
 exports.createArticle = validate([
     body('article.title').notEmpty().withMessage('文章标题不能为空'),
     body('article.description').notEmpty().withMessage('文章摘要不能为空'),
     body('article.body').notEmpty().withMessage('文章内容不能为空'),
 ])