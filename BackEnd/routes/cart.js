const express = require("express");
const router = new express.Router();
const Cart = require('../models/cart');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const match = {};
        await req.user.populate({
            path: 'Cart',
            match,
        }).execPopulate();
        return res.status(200).send(req.user.Cart);
    } catch (err) {
        res.status(400).send(err);
    };
});


router.post('/', auth, async (req, res) => {
    try {
        await Cart.updateOne({ owner: req.user._id }, {
            $set: {
                products: req.body,
                owner: req.user._id
            }
        }, { upsert: true });
        res.status(201).send();
    }
    catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;