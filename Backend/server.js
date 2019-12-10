const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect the DataBase
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start with on port ${PORT}`));