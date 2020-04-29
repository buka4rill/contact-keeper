// Entry point to the backend

const express = require('express');
const connectDB = require('./config/db');

// Connect Database
connectDB();

// Initialise express
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Add route and send data
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKepper API' }));

// Define Routes- Look at the routes files
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));



const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => console.log(`Server started on ${PORT}`));