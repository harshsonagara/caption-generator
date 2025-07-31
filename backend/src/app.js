require('dotenv').config();
const express = require('express');
const cookie = require('cookie-parser')
const ConnectToDB = require("./db/db");

const app = express();
app.use(express.json());
app.use(cookie());
ConnectToDB();

// Routes
const authRoutes = require('./routes/auth.route')
app.use('/api/auth', authRoutes);


module.exports = app;