// Entry point to the backend

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Connect Database
connectDB();

// Initialise express
const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Add route and send data
// app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKepper API' }));

// Define Routes- Look at the routes files
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // get anything that's not defined routes
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}



const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, () => console.log(`Server started on ${PORT}`));