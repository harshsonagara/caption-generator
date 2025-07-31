require('dotenv').config();
const express = require('express');
const ConnectToDB = require("./db/db");

const app = express();
app.use(express.json());
ConnectToDB();

// Routes
const authRoutes = require('./routes/auth.route')
app.use('/auth',authRoutes);


module.exports = app;