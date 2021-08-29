import Department from '../../models/department.js';

const get_depts = (req,res) => {
    Department.find()
        .then((result) => {
            res.status(200).json({data: result})
        })
        .catch(err => {
            res.status(404).json({message: err.message});
        })
};

export default {
    get_depts
};