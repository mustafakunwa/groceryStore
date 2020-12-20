const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }

        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [7, 'minlength is greater then 7'],
        validate(value) {
            if (value.includes('password'))
                throw new Error('password cannot contain password');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
}, {
    timestamps: true,
})

userSchema.virtual('Cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.virtual('Orders', {
    ref: 'Orders',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SALT, { expiresIn: '300 min' })
    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user)
        throw new Error("Email doesn't exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error("Incorrect password");
    return user;

}

//Hash user password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


const User = mongoose.model('Users', userSchema)

module.exports = User;