const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                //subject to change to a custom response later
                throw new Error('Invalid Email');
            }
        }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        validate(value) {

        }
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }

});

//updated_at should be the current time only when updated
UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    this.created_at = Date.now();
    next();
});


module.exports = mongoose.model('User', UserSchema);