// Login authentication, chech logged in user

// Init express for routing
const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    res.send('Log in user');
});

// Export
module.exports = router;