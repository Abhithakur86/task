const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category_id',
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  serviceName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'service_name'
  },
  type: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: 'Normal',
    validate: {
      isIn: [['Normal', 'VIP']]
    }
  }
}, {
  tableName: 'services',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relationships
Category.hasMany(Service, { foreignKey: 'categoryId', as: 'services', onDelete: 'CASCADE' });
Service.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = Service;