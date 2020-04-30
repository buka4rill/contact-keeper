// CRUD Functionality specific to user

// Init express for routing
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Include User and Contact model
const User = require('../models/User');
const Contact = require('../models/Contact');


// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all contacts');

    // Pull from db
    try {
        // find contact and sort by most recent contact first
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); 

        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Export
module.export = router;

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post(
    '/', 
    [ auth, 
        [
            check('name', 'Name is required')
                .not()
                .isEmpty()
        ] 
    ], 
    async (req, res) => {
    // res.send('Add contact');

    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Pull out data from body
    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        // Put contact into db
        const contact = await newContact.save();

        // return contact to client
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// Export
module.exports = router;

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', auth, async (req, res) => {
    // res.send('Update contact');

    // Pull out data from body
    const { name, email, phone, type } = req.body;

    // Build contact object
    // Based on the fields submitted, check to see if submitted
    const contactFields = {};
    
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure that user owns the contact
        if (contact.user.toString() !== req.user.id) {
            // Unauthorised
            return res.status(401).json({ msg: 'Not authorized'});
        }

        // Update contact
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true });

        // Send updated contact to client
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Export
module.exports = router;

// @route       DELETE api/contact/:id
// @desc        Get logged in user
// @access      Private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete contact');

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure that user owns the contact
        if (contact.user.toString() !== req.user.id) {
            // Unauthorised
            return res.status(401).json({ msg: 'Not authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id);

        // Send updated contact to client
        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Export
module.exports = router;