import Joi from "joi";

export const userSchemaValidate = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "First Name is required",
    "string.min": "First name must be at least 3 characters",
    "string.max": "First name cannot exceed 30 characters",
  }),
  lastName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 3 characters",
    "string.max": "Last name cannot exceed 30 characters",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 chars long and include uppercase, lowercase, number, and special character.",
    }),
});
