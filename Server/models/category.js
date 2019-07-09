'use strict'

const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategoriesSchema = Schema({
    categoryName: { type: String, required: true, minlength: 3, maxlength: 255 }
});

function validateCategory(category)
{
    const schema = {
        categoryName: Joi.string().min(3).max(255).required()
    };
    return Joi.validate(category, schema);
}

exports.CategorySchema = mongoose.model('Category', CategoriesSchema);
exports.validateCategory = validateCategory;