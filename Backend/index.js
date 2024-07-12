require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db.js');
const userRoutes = require('./routes/user.js');
const requestRoutes = require('./routes/request.js');
const verifyToken = require('./middlewares/auth.js');

const app = express();
app.use(express.json());


app.use('/request', requestRoutes);
app.use('/sync', (req,res) => {
  sequelize.sync({force: true})
  .then(() => {
    res.status(200).send('Database synced');
  })
  .catch(() => {
    res.status(500).send('Error syncing database');
  });
});
app.use('/', verifyToken, userRoutes);

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
