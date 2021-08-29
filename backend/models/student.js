import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  major: {
      type: String,
      required: true
  },
  grades: [{
      code: {
          type: String,
          required: true,
          unique: true
      },
      mark: {
          type: Number,
          required: true,
          default: 0
      },
      semester: {
          type: String,
          required: true
      }
  }],
});

const Student = mongoose.model('Student',studentSchema);
export default Student;