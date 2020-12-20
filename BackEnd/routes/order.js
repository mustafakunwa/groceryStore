const express = require("express");
const router = new express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const match = {};
        await req.user.populate({
            path: 'Orders',
            match,
        }).execPopulate();
        return res.status(200).send(req.user.Orders);
    } catch (err) {
        res.status(400).send(err);
    };
});


router.post('/', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner: req.user._id
    });
    try {
        await order.save();
        res.status(201).send(order);
    }
    catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;