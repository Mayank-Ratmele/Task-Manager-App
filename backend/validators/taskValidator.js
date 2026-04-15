const { body } = require("express-validator");

exports.createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be text"),
];

exports.updateTaskValidator = [
  body("status")
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),
];