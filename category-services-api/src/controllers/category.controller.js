const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const Service = require('../models/Service');

// Create Category
const createCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryName } = req.body;

    const category = await Category.create({ categoryName });

    res.status(201).json({
      message: 'Category created successfully',
      category
    });

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Service,
        as: 'services',
        attributes: ['id', 'serviceName', 'type']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Categories retrieved successfully',
      count: categories.length,
      categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.categoryName = categoryName;
    await category.save();

    res.json({
      message: 'Category updated successfully',
      category
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Category (only if empty)
const deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId, {
      include: [{ model: Service, as: 'services' }]
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if category has services
    if (category.services && category.services.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with services. Please remove all services first.' 
      });
    }

    await category.destroy();

    res.json({
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};