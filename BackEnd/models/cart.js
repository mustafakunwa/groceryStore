const { any, string } = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
    products: [{
        name: String,
        price: Number,
        _id: String,
        qty: Number
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {
    timestamps: true,
})




const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;