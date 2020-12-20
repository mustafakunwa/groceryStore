const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SALT)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user)
            throw new Error()
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ error: 'please Authenticate' })
    }

}

module.exports = auth;