import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
  matric_no: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  middlename: { type: String,},
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: {type: String},
  level: { type: String, required: true},
  department: { type: String, required: true},
  session: { type: String, required: true},
  role: { type: String, enum: ["student"], required: true},
  isAdmin: { type: Boolean, default: false},
//   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
}, {timestamps: true});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);