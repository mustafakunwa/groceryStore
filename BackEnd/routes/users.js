const express = require("express");
const router = new express.Router();
const User = require('../models/users');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateToken();
        return res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    };
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken();
        return res.status(200).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;