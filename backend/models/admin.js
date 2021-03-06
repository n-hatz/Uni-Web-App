import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    major: {
        type: String,
        default: "Admin",
        required: true
    }
})

const Admin = mongoose.model('Admin',adminSchema);

export default Admin;