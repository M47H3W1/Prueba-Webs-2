const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const sequelize = require('./server/config/sequelize.config.js'); 
const seed = require('./server/data/seed.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const reservationRoutes = require('./server/routes/reservas.routes');

app.use('/api/reservas', reservationRoutes);

// Wait for the database to sync, then execute the seed and start the server
sequelize.sync({ force: true }).then(async () => {
  console.log("Database synchronized");
  await seed();
  app.listen(port, () => {
    console.log("Server running on port: ", port);
  });
}).catch((error) => {
  console.error("Error synchronizing the database", error);
});