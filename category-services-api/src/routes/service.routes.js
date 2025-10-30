const express = require('express');
const { authenticateToken } = require('../middlewares/auth.middleware');
const serviceValidators = require('../validators/service.validator');
const {
  createService,
  getServicesByCategory,
  updateService,
  deleteService
} = require('../controllers/service.controller');

const router = express.Router();

// All service routes require authentication
router.post('/category/:categoryId/service', authenticateToken, serviceValidators.create, createService);
router.get('/category/:categoryId/services', authenticateToken, getServicesByCategory);
router.put('/category/:categoryId/service/:serviceId', authenticateToken, serviceValidators.update, updateService);
router.delete('/category/:categoryId/service/:serviceId', authenticateToken, serviceValidators.delete, deleteService);

module.exports = router;