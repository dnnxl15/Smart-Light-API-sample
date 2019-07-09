'use strict'

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    lastName: { type: String, required: true,  minlength: 2, maxlength: 255  },
    username: { type: String, required: true, minlength: 2 },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, minlength: 2, maxlength: 255 },
    role: { type: String, required: true, minlength: 2, maxlength: 255, enum: ["Administrator", "Regular"] },
    image: String,
    isAdmin: Boolean
});

function validateUser(user)
{
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        username: Joi.string().min(2).max(255).required(),
        mail: Joi.string().required().email(),
        password: Joi.string().min(2).max(255).required(),
        phone: Joi.number().required(),
        role: Joi.string().min(2).max(255).required()
    };
      return Joi.validate(user, schema);
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, "MySecurePassword");//config.get('jwtPrivateKey'));
    return token;
}

exports.UserSchema = mongoose.model('User', userSchema);
exports.validateUser = validateUser;