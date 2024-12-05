import mongoose from "mongoose";

const CourseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    unit: { type: String, required: true },
    thumbnail: { type: String, required: true },
    lecturer_id: { type: mongoose.Schema.ObjectId, ref: "Lecturer" },
    desc: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    prerequisites: [{ type: String }],
    level: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, required: true },
    progress: { type: Number, default: 0 },
    schedule: {
        // dayOfWeek: {
        //   type: Date,
        //   enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        // },
        frequency: { type: String, enum: ["once", "daily", "weekly", "monthly"]},
        day: { type: String, enum: ["Mo", "Tu", "We", "Th", "Fr"]},
        duration: { type: String, enum: ["5 min", "10 min", "20 min", "30 min", "1 hr"]},
        time: { type: String }
        // startTime: { type: String },
        // endTime: { type: String },  
      },
    section: [
      {
        // lecture: String,
        title: String,
        content: String,
        lectures: [{ count: String, title: String }],
        assignments: [{ count: String, title: String, description: String }],
        quizzes: [{ count: String, title: String, description: String }],
      },
    ],
    class_link: {
        platform: String,
        link: String,
      },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("course", CourseSchema);
