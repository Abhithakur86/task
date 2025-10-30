const { body, param } = require('express-validator');

const categoryValidators = {
  create: [
    body('categoryName')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 2, max: 255 })
      .withMessage('Category name must be between 2 and 255 characters')
  ],
  
  update: [
    param('categoryId').isInt().withMessage('Invalid category ID'),
    body('categoryName')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ min: 2, max: 255 })
      .withMessage('Category name must be between 2 and 255 characters')
  ],
  
  delete: [
    param('categoryId').isInt().withMessage('Invalid category ID')
  ]
};

module.exports = categoryValidators;