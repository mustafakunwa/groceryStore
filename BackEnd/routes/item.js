const express = require("express");
const router = new express.Router();
const Item = require('../models/items');

router.post('/', async (req, res) => {
    const item = new Item(req.body);
    try {
        await item.save();
        return res.status(201).send(item);
    } catch (err) {
        res.status(400).send(err);
    };
});

router.get('/', async (req, res) => {
    try {
        let items = await Item.find({}).select({ 'name': 1, 'price': 1, "unt": 1 })
        res.status(200).send(items);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;