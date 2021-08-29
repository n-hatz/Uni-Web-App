import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import postRouter from './api/routes/posts.route.js';
import studentRouter from './api/routes/student.route.js';
import deptRouter from './api/routes/depts.route.js';
import adminRouter from  './api/routes/admin.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/forum',postRouter);
app.use('/api/student',studentRouter);
app.use('/api/departments',deptRouter);
app.use('/api/admin',adminRouter);

mongoose.connect(process.env.DB_URI, {useNewURlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
.catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);    //for warnings