import mongoose from "mongoose";

const LecturerSchema = mongoose.Schema({
    staff_id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  middlename: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: {type: String},
  department: { type: String, required: true },
  role: { type: String, enum: ["lecturer"], required: true },
  isAdmin: { type: Boolean, default: false, required: true },
//   courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
}, {timestamps: true});

export default mongoose.models.Lecturer || mongoose.model("Lecturer", LecturerSchema);