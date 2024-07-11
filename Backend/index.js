require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db.js');
const userRoutes = require('./routes/user.js');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

sequelize.authenticate()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
