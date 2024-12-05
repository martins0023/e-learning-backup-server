import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.ObjectId, ref: "Course", require: true},
    lecture_id: { type: mongoose.Schema.ObjectId, ref: "Lecture", require: true},
    date: { type: Date, default: Date.now},
    present: [
        {
            student_id: { type: mongoose.Schema.ObjectId, ref: "Student"},
            timestamps: {type: Date, default: Date.now }
        }
    ],
    absent: [
        {
            student_id: { type: mongoose.Schema.ObjectId, ref: "Student"},
        }
    ]
})

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);