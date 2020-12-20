const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
    order: [
        {
            name: String,
            qty: Number,
        }
    ],
    price: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {
    timestamps: true,
})


const Order = mongoose.model('Orders', orderSchema)

module.exports = Order;