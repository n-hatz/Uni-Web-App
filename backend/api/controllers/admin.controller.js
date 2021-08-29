import Admin from '../../models/admin.js';
import Student from '../../models/student.js';

const sign_in = async (req,res) => {
    const {username, password} = req.body;
    const secret = process.env.SECRET;

    try {
        const existingUser = await Admin.findOne({username});
        if(!existingUser) return res.status(404).json({ message: "Admin not found." });

        const matching = await bcrypt.compare(password,existingUser.password);
        if(!matching) return res.status(400).json({ message: "Wrong password." });

        const token = jwt.sign({username: existingUser.username, id: existingUser._id},secret,{expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const get_student = (req,res) => {
    Student.find({username: req.params.username})
        .then(result => {
            res.status(200).json({data: result});
        })
        .catch(err => {
            res.status(404).json({message: err.message});
        })
}

const add_grade = async (req,res) => {
    //const {code, mark, semester} = req.body;
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).json({ message: "Student not found." });

    student.grades.push(req.body);
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id,student,{new: true});
        res.status(200).json(updated);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

const update_grade = async (req,res) => {
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).json({ message: "Student not found." });

    try {
        await Student.findOneAndUpdate({_id: req.params.id},req.body, {new:true});
        res.status(200).json(req.body);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

const delete_grade = async (req,res) => {
    //student id as param, grade code in req.body
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).json({ message: "Student not found." });

    try {
        const updated = await Student.findOneAndUpdate({_id: req.params.id},{"$pull": {"grades": { "code": req.body.code}}},{new: true});
        res.status(200).json(updated);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

export default {
    sign_in,
    get_student,
    add_grade,
    update_grade,
    delete_grade
}