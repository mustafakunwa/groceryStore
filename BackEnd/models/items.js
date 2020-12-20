const mongoose = require("mongoose");
const validator = require("validator");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    price: {
        type: Number,
        default: 1
    },
    unit: {
        type: String,
        default: 'piece',
    }
}, {
    timestamps: true,
})

const Item = mongoose.model('Items', itemSchema)

module.exports = Item;