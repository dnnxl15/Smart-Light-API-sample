'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');


var LightSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    electric_consumption: { type: String, required: false, minlength: 3, maxlength: 255 },
    color: { type: String, required: false, minlength: 1, maxlength: 255 },
    capacity: { type: String, required: false, minlength: 1, maxlength: 255 },
    life_time: { type: Number, minlength: 2, maxlength: 255, required: false },
    type: { type: String, required: true, minlength: 3, maxlength: 255 },
    category: { type: String, required: true, minlength: 3, maxlength: 255 },
    user_id_master: {type: mongoose.Schema.Types.ObjectId, required: true},
    user_permitted:{
        user_id: {type: mongoose.Schema.Types.ObjectId},
    },
    status: {type:Boolean, required: true}
});

function validateLight(light)
{
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        electric_consumption: Joi.string().min(2).max(255),
        color: Joi.string().min(1).max(255),
        capacity: Joi.string().min(1).max(255),
        life_time: Joi.string().min(2).max(255),
        type: Joi.string().min(2).max(255).required(),
        category: Joi.string().min(2).max(255).required(),
        user_id_master: Joi.string().min(2).max(255).required(),
        status: Joi.boolean().required()
    };
      return Joi.validate(light, schema);
}

exports.LightSchema = mongoose.model('Light', LightSchema);
exports.validateLight = validateLight;