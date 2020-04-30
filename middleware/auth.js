// Check to see if there's a token and header

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token (doesn't exist)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // If there's token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Assign user to request object
        req.user = decoded.user;
        
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}