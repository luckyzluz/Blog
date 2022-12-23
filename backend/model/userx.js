const expressSchema = require('express-schema'),
    schemas = expressSchema.schemas,
    Schema = expressSchema.Schema;
// const baseModel = require('./base-model')
// const md5 = require('../util/md5')
const userSchema = new Schema({
    // ...baseModel,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),
        select: false
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
});

module.exports = userSchema