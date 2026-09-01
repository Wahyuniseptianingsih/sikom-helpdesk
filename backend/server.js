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

const assetRoutes = require('./src/routes/assetRoutes');
app.use('/api/assets', assetRoutes);

const ticketRoutes = require('./src/routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const maintenanceRoutes = require('./src/routes/maintenanceRoutes');
app.use('/api/maintenance', maintenanceRoutes);

const refRoutes = require('./src/routes/refRoutes');
app.use('/api/ref', refRoutes);

const sparePartRoutes = require('./src/routes/sparePartRoutes');
app.use('/api/sparepart', sparePartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server jalan di port ${PORT}`);
});
