// VALIDATION
const Joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    birthDate: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

// LOGIN VALIDATION
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

// EMOTIONS VALIDATION
/* const emotionsValidation = (data) => {
  const schema = Joi.object({
    module: Joi.string().required(),
    intensity: Joi.number().integer().required(),
    title: Joi.string().required(),
    detailsText: Joi.string().required(),
  });

  return schema.validate(data);
}; */

// SYMPTOMS VALIDATION
/* const symptomsValidation = (data) => {
  const schema = Joi.object({
    module: Joi.string().required(),
    intensity: Joi.string().required(),
    category: req.body.category,
    location: req.body.location,
    detailsText: Joi.string().required(),
  });

  return schema.validate(data);
}; */

// SYMPTOMSCATEGORIES VALIDATION
/* const symptomsCategoriesValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return schema.validate(data);
}; */

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
/* module.exports.emotionsValidation = emotionsValidation;
module.exports.symptomsValidation = symptomsValidation;
module.exports.symptomsCategoriesValidation = symptomsCategoriesValidation; */
