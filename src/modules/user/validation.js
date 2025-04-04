const Joi = require("joi");

const userSchema = Joi.object({
    first_name: Joi.string().max(16).min(3).required(),
    last_name: Joi.string().max(16).min(3).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(16).min(6).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    job_title: Joi.string().max(100).default("Unemployed"),
});


const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(16).min(6).required()
});

const fileSchema = Joi.object({
    file: Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().valid("text/plain", "application/json").required(),
        size: Joi.number().max(8 * 1024 * 1024).required(),
    }).unknown(true),
});

module.exports = { userSchema, loginSchema, fileSchema };
