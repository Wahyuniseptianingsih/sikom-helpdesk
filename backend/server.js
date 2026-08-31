const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('sikom backend jalan');
});

app.use('/api/users', userRoutes);

const ticketRoutes = require('./src/routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server jalan di port ${PORT}`);
});