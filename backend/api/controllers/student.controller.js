import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Student from '../../models/student.js';

const sign_in = async (req,res) => {
    const { username, password } = req.body;
    const secret = process.env.SECRET;

    try {
        const existingUser = await Student.findOne({username}); //search for user
        if(!existingUser) return res.status(404).json({ message: "User not found." });

        const matching = await bcrypt.compare(password,existingUser.password);  //check that passwords match
        if(!matching) return res.status(400).json({ message: "Wrong password." });

        const token = jwt.sign({username: existingUser.username, id: existingUser._id},secret,{expiresIn: "1h"});   //sign token, valid for 1 hour

        res.status(200).json({result: existingUser, token});
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
    }
};

const sign_up = async (req,res) => {
    const {username, password, firstname, lastname, major} = req.body;
    const secret = process.env.SECRET;

    try {
        const uniqueUsername = await Student.findOne({ username }); //check that username does not exist
        if(uniqueUsername) return res.status(400).json({message: "Username already taken."});

        const hashed = await bcrypt.hash(password,12);  //hash password

        const result = await Student.create({username,password: hashed, name: `${firstname} ${lastname}`, major});  //create new student entry
        const token = jwt.sign({username: result.username, id: result._id},secret, {expiresIn: "1h"});  //sign token, valid for 1 hour
        res.status(201).json({result, token});
    } catch (err) {
        res.status(500).json({message: "Internal server error."});
        console.log(err);
    }
};

export default {
    sign_in,
    sign_up
};