// CRUD Functionality specific to user

// Init express for routing
const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', (req, res) => {
    res.send('Get all contacts');
});

// Export
module.export = router;

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post('/', (req, res) => {
    res.send('Add contact');
});

// Export
module.exports = router;

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// Export
module.exports = router;

// @route       DELETE api/contact/:id
// @desc        Get logged in user
// @access      Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

// Export
module.exports = router;