import mongoose from "mongoose";

const AssignmentSchema = mongoose.Schema({
    assignment_id: { type: String, require: true},
    lecturer_id: { type: mongoose.Schema.ObjectId, ref: "Lecturer", require: true},
    submit: [
        {
            student_id: { type: mongoose.Schema.ObjectId, ref: "Student", require: true},
            submission_date: { type: Date, default: Date.now},
            file_Path: { type: String, required: true},
            // score: { type: Number}
        }
    ]
})

export default mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);