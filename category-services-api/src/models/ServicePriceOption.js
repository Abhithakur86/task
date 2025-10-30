const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Service = require('./Service');

const ServicePriceOption = sequelize.define('ServicePriceOption', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'service_id',
    references: {
      model: 'services',
      key: 'id'
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['Hourly', 'Weekly', 'Monthly']]
    }
  }
}, {
  tableName: 'service_price_options',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relationships
Service.hasMany(ServicePriceOption, { foreignKey: 'serviceId', as: 'priceOptions', onDelete: 'CASCADE' });
ServicePriceOption.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

module.exports = ServicePriceOption;