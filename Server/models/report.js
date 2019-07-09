'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

var ReportSchema = Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    description: { type: String, required: true, minlength: 3, maxlength: 255 },
    date: {type: Date, default: Date.now, required: true},
    light_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    status: {type:Boolean, required: true}
});

function validateReport(report)
{
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(255).required(),
        date: Joi.date().required(),
        light_id: Joi.string().required(),
        user_id: Joi.string().required(),
        status: Joi.boolean().required()
    };
      return Joi.validate(report, schema);
}

exports.ReportSchema = mongoose.model('Report', ReportSchema);
exports.validateReport = validateReport;