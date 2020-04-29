// Login authentication, chech logged in user

// Init express for routing
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Include User model
const User = require('../models/User');


// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

// Export
module.exports = router;


// @route       POST api/auth
// @desc        Auth user & get token (user logs in)
// @access      Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
    // res.send('Log in user');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        // If User, check the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        // If it matches, send token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            {
                expiresIn: 360000
            }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Export
module.exports = router;