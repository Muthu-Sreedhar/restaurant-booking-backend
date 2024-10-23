import mongoose from 'mongoose';

const AppUserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    ConfirmPassword: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    IsActive: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const AppUser = mongoose.model('AppUser', AppUserSchema);
export default AppUser;
