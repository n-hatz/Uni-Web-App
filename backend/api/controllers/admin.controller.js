import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../../models/admin.js';
import Student from '../../models/student.js';

const sign_in = async (req,res) => {
    const {username, password} = req.body;  //get credentials
    const secret = process.env.SECRET;

    try {
        const existingUser = await Admin.findOne({username});   //search for admin
        if(!existingUser) return res.status(404).json({ message: "Admin not found." });

        const matching = await bcrypt.compare(password,existingUser.password);  //compare passwords
        if(!matching) return res.status(400).json({ message: "Wrong password." });

        const token = jwt.sign({username: existingUser.username, id: existingUser._id},secret,{expiresIn: "1h"});   //sign token - valid 1 hour

        res.status(200).json({result: existingUser, token});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const search_student = async (req,res) => {
    const { username, major} = req.query;

    try {
        const students = await Student.find({ $or: [ { username }, { major }]});    //search docs based on query
        res.json({data: students});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

const get_students = async (req,res) => {
    const { page } = req.query;
    const limit = 20;
    const start = (Number(page)-1) * limit; //starting index

    try {
        const totalStudents = await Student.countDocuments();
        const students = await Student.find().limit(limit).skip(start);
        res.json({data: students, page: page, totalPages: Math.ceil(totalStudents / limit)});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

const get_student_by_id = async (req,res) => {
    Student.findById(req.params.id) //search by id
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({message: err.message});
        })
};


const add_grade = async (req,res) => {
    //const {code, mark, semester} = req.body;
    const student = await Student.findById(req.params.id);  //search student
    if(!student) return res.status(404).json({ message: "Student not found." });

    student.grades.push(req.body);  //add new grade to grades array
    try {
        const updated = await Student.findByIdAndUpdate(req.params.id,student,{new: true}); //update student
        res.status(201).json(updated);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

const update_grade = async (req,res) => {
    const student = await Student.findById(req.params.id);
    if(!student) return res.status(404).json({ message: "Student not found." });

    const index = student.grades.findIndex(x => x._id == req.body.grade_id);    //find grade by id
    if (index > -1) {
        student.grades[index] = req.body.grade; //update said grade
        } else {
            return res.status(404).json({message: "Grade not found."});
        }

    try {
        //await Student.findOneAndUpdate({'grades._id': req.body},req.body, {new:true});
        const updated = await Student.findByIdAndUpdate(req.params.id,student,{new: true}); //update student with new grade
        res.status(200).json(updated);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
};

const delete_grade = async (req,res) => {
    const id = req.params.id;
    const grade_id = req.params.grade_id;
    const student = await Student.findById(id);
    if(!student) return res.status(404).json({ message: "Student not found." });

    let grades = student.grades;
    const index = grades.findIndex(x => x._id == grade_id);    //delete grade with id in body from array of grades
    if (index > -1) {
    grades.splice(index, 1);
    } else {
        return res.status(404).json({message: "Grade not found."});
    }

    try {
        //const updated =
        await Student.updateOne({_id: id}, {$pull: {'grades': {_id: grade_id} }}, {safe: true, multi: true});   //update student with grade now removed
        res.status(204).json({message: "Deleted successfully."});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

export default {
    sign_in,
    search_student,
    get_students,
    get_student_by_id,
    add_grade,
    update_grade,
    delete_grade
}