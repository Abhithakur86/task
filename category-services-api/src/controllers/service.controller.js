const { validationResult } = require('express-validator');
const Service = require('../models/Service');
const ServicePriceOption = require('../models/ServicePriceOption');
const Category = require('../models/Category');
const sequelize = require('../config/database');

// Create Service
const createService = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId } = req.params;
    const { serviceName, type, priceOptions } = req.body;

    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create service
    const service = await Service.create({
      categoryId,
      serviceName,
      type
    }, { transaction });

    // Create price options
    const priceOptionPromises = priceOptions.map(option => 
      ServicePriceOption.create({
        serviceId: service.id,
        duration: option.duration,
        price: option.price,
        type: option.type
      }, { transaction })
    );

    await Promise.all(priceOptionPromises);
    await transaction.commit();

    // Fetch complete service with price options
    const createdService = await Service.findByPk(service.id, {
      include: [{ model: ServicePriceOption, as: 'priceOptions' }]
    });

    res.status(201).json({
      message: 'Service created successfully',
      service: createdService
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Services in Category
const getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const services = await Service.findAll({
      where: { categoryId },
      include: [{
        model: ServicePriceOption,
        as: 'priceOptions'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Services retrieved successfully',
      category: category.categoryName,
      count: services.length,
      services
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Service
const updateService = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId, serviceId } = req.params;
    const { serviceName, type, priceOptions } = req.body;

    const service = await Service.findOne({
      where: { id: serviceId, categoryId }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found in this category' });
    }

    // Update service fields
    if (serviceName) service.serviceName = serviceName;
    if (type) service.type = type;
    await service.save({ transaction });

    // Update price options if provided
    if (priceOptions && Array.isArray(priceOptions)) {
      // Delete existing price options
      await ServicePriceOption.destroy({
        where: { serviceId: service.id },
        transaction
      });

      // Create new price options
      const priceOptionPromises = priceOptions.map(option =>
        ServicePriceOption.create({
          serviceId: service.id,
          duration: option.duration,
          price: option.price,
          type: option.type
        }, { transaction })
      );

      await Promise.all(priceOptionPromises);
    }

    await transaction.commit();

    // Fetch updated service with price options
    const updatedService = await Service.findByPk(service.id, {
      include: [{ model: ServicePriceOption, as: 'priceOptions' }]
    });

    res.json({
      message: 'Service updated successfully',
      service: updatedService
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Service
const deleteService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryId, serviceId } = req.params;

    const service = await Service.findOne({
      where: { id: serviceId, categoryId }
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found in this category' });
    }

    await service.destroy();

    res.json({
      message: 'Service deleted successfully'
    });

  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createService,
  getServicesByCategory,
  updateService,
  deleteService
};