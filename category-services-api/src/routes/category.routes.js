const express = require('express');
const { authenticateToken } = require('../middlewares/auth.middleware');
const categoryValidators = require('../validators/category.validator');
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');

const router = express.Router();

// All category routes require authentication
router.post('/category', authenticateToken, categoryValidators.create, createCategory);
router.get('/categories', authenticateToken, getAllCategories);
router.put('/category/:categoryId', authenticateToken, categoryValidators.update, updateCategory);
router.delete('/category/:categoryId', authenticateToken, categoryValidators.delete, deleteCategory);

module.exports = router;