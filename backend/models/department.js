import mongoose from 'mongoose';

const deptSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    building: {
        type: String,
        default: "Main building"
    },
    courses: [{
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        prof: {
            type: String,
            required: true
        },
        prereq: {
            type: String,
            default: "-"
        }
    }]
});

const Department = mongoose.model('Department',deptSchema);
export default Department;