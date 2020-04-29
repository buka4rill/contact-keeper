// connect to db with mongoose

const mongoose = require('mongoose');
const config = require('config');

// Initialise db
const db = config.get('mongoURI');

// // Mongoose returns a promise
// const connectDB = () => {
//     mongoose.connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     })
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => {
//         console.error(err.message);
//         // Exit with failure
//         process.exit(1);
//     });
// }

// Initialise db refactored with asyn await
// Mongoose returns a promise
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;