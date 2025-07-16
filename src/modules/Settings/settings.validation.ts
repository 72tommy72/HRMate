import Joi from "joi";

/**
 * Validation schema for updating settings
 * Defines the structure and rules for settings updates
 */
export const updateSettingsValidation = Joi.object({
  // Category must be one of these predefined values
  category: Joi.string()
    .valid("general", "financial", "whatsapp", "security")
    .required(),

  // Settings object - flexible structure based on category type
  settings: Joi.object().required(),

  // Optional field to track who made the update
  updatedBy: Joi.string().optional(),
});
