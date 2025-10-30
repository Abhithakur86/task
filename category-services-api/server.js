require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('✅ Supabase PostgreSQL connection established successfully.');
    // Don't sync - tables already created in Supabase
    // Use { alter: true } only if you want Sequelize to manage schema
    return sequelize.sync({ alter: false }); 
  })
  .then(() => {
    console.log('✅ Database models synchronized.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🗄️  Database: Supabase PostgreSQL`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to Supabase database:', err);
    console.error('Check your .env file and Supabase credentials');
    process.exit(1);
  });