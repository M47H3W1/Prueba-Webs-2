const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const sequelize = require('./server/config/sequelize.config.js'); 
const seed = require('./server/data/seed.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./server/routes/auth.routes');
const reservationRoutes = require('./server/routes/reservas.routes');
const canchasRoutes = require('./server/routes/canchas.routes');
const authenticateToken = require('./server/middleware/authentication_mw');

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/reservas', authenticateToken, reservationRoutes);
app.use('/api/canchas', authenticateToken, canchasRoutes);

sequelize.sync({ force: true }).then(async () => {
  console.log("Database synchronized");
  await seed();
  app.listen(port, () => {
    console.log("Server running on port: ", port);
  });
}).catch((error) => {
  
  console.error("Error synchronizing the database", error);
});