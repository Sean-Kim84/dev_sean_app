const express = require('express');
const connectDB = require('./config/db');

const app = express();

// call the routes {무조건 module exports 를 router로 해야한다}
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Connect the DataBase
connectDB();

//Init Middlewares
app.use(express.json({
  extended: false
}));

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(profile);
app.use(posts);

module.exports = app;