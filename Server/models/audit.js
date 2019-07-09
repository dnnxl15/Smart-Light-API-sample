'use strict'

const mongoose = require('mongoose');
const Joi = require('joi');

var AuditSchema = new mongoose.Schema({
	action: { type: String, required: true, minlength: 3, maxlength: 255 },
	table_name: { type: String, required: true,  minlength: 2, maxlength: 255 },
	date: { type:Date, default: Date.now, required: true },
	user_id: { type:mongoose.Schema.Types.ObjectId, required:true }
});

function validateAudit(audit)
{
    const schema = {
        action: Joi.string().min(3).max(255).required(),
        table_name: Joi.string().min(2).max(255).required(),
		date: Joi.date().required(),
		user_id: Joi.string().min(2).max(255).required()
    };
      return Joi.validate(audit, schema);
}

exports.AuditSchema = mongoose.model('Audit', AuditSchema);
exports.validateAudit = validateAudit;