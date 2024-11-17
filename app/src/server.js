const express = require("express");
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const userRoute = require('./src/Routes/authRoutes');
const phaseRoutes = require('./src/Routes/phaseRoutes');
const blockRoutes = require('./src/Routes/blockRoutes');
const uploadRoutes = require('./src/Routes/uploadRoutes');
const ownerRoutes = require('./src/Routes/ownerRoutes');
const memberShipRoutes = require('./src/Routes/memberShipRoutes');
const chagesRoutes = require('./src/Routes/chagesRoutes');
const chargeTypeRoutes = require('./src/Routes/chargeTypeRoutes');
const transfer = require('./src/Routes/transfer');
const fs = require('fs');
const pdf = require('pdf-parse');

const cron = require('node-cron');
const { markOverduePayments } = require('./src/Controllers/charges/chargesControllers');
const path = require('path');

const cookieParser = require('cookie-parser');
const { verifyaccessToken } = require("./src/Middlewares/authMiddleware");
const { updateOwnerStatus } = require("./src/Controllers/memberShip/membershipControllsers");
const PORT = process.env.PORT || 8001;
cron.schedule('0 0 * * *', () => {
    console.log('Checking for overdue payments...');
    markOverduePayments();
});
cron.schedule('* * * * *', () => {
    updateOwnerStatus()
});

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '3000mb', extended: true }));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use(cookieParser({
    origin: "http://localhost:3000/",
}));
app.use('/api/auth', userRoute);
app.use('/api/', phaseRoutes);
app.use('/api/', blockRoutes);
app.use('/api/', uploadRoutes);
app.use('/api/', ownerRoutes);
app.use('/api/', memberShipRoutes);
app.use('/api/', chagesRoutes);
app.use('/api/', chargeTypeRoutes);
app.use('/api/', transfer);

app.use('/api/assets', express.static(path.join(__dirname, 'uploads/images')));
app.use('/api/assets', express.static(path.join(__dirname, 'uploads/pdfs')));

// app.use('/', (req, res) => {
//     return res.send({ Message: "WELL COME TO ICHS" })
// });


// Connect to the database
connectDB();

app.listen(PORT || 8001, () => {
    console.log('ICHS SERVER STARTED ON PORT : ' + `http://localhost:${PORT}/`);
});
