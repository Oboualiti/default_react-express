const dotenv = require('dotenv');
const app = require('./app');
const { initializeDatabase } = require('./services/dbInitService');

dotenv.config();

const PORT = process.env.PORT || 5000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  });
