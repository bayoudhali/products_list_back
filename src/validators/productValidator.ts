import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  createdBy: Joi.string().required().messages({
    "string.empty": "CreatedBy is required",
  }),
  updatedBy: Joi.string().required().messages({
    "string.empty": "UpdatedBy is required",
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional().allow(""),
  description: Joi.string().optional().allow(""),
  category: Joi.string().optional().allow(""),
  updatedBy: Joi.string().optional().allow(""),
});
