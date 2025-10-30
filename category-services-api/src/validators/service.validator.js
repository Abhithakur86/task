const { body, param } = require('express-validator');

const serviceValidators = {
  create: [
    param('categoryId').isInt().withMessage('Invalid category ID'),
    body('serviceName')
      .trim()
      .notEmpty()
      .withMessage('Service name is required')
      .isLength({ min: 2, max: 255 })
      .withMessage('Service name must be between 2 and 255 characters'),
    body('type')
      .isIn(['Normal', 'VIP'])
      .withMessage('Type must be either Normal or VIP'),
    body('priceOptions')
      .isArray({ min: 1 })
      .withMessage('At least one price option is required'),
    body('priceOptions.*.duration')
      .isInt({ min: 1 })
      .withMessage('Duration must be a positive integer'),
    body('priceOptions.*.price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('priceOptions.*.type')
      .isIn(['Hourly', 'Weekly', 'Monthly'])
      .withMessage('Price option type must be Hourly, Weekly, or Monthly')
  ],
  
  update: [
    param('categoryId').isInt().withMessage('Invalid category ID'),
    param('serviceId').isInt().withMessage('Invalid service ID'),
    body('serviceName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Service name must be between 2 and 255 characters'),
    body('type')
      .optional()
      .isIn(['Normal', 'VIP'])
      .withMessage('Type must be either Normal or VIP'),
    body('priceOptions')
      .optional()
      .isArray()
      .withMessage('Price options must be an array'),
    body('priceOptions.*.duration')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Duration must be a positive integer'),
    body('priceOptions.*.price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('priceOptions.*.type')
      .optional()
      .isIn(['Hourly', 'Weekly', 'Monthly'])
      .withMessage('Price option type must be Hourly, Weekly, or Monthly')
  ],
  
  delete: [
    param('categoryId').isInt().withMessage('Invalid category ID'),
    param('serviceId').isInt().withMessage('Invalid service ID')
  ]
};

module.exports = serviceValidators;