import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import AuthRoute from "./routes/auth.js"
import StudentRoute from "./routes/student.js"
import LecturerRoute from "./routes/lecturer.js"
import CourseRoute from "./routes/course.js";

dotenv.config();
const app = express();
connectDb();

app.use(express.urlencoded({ extended: true }));

const origin = process.env.NODE_ENV !== "production" ? "http://localhost:3000" : process.env.CROSS_ORIGIN_URL

// Middleware
app.use(cors({
    origin: origin,
    credentials: true
}))
app.use(cookieParser());


app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Your API works")
})

app.use("/api/auth", AuthRoute)
app.use("/api/student", StudentRoute);
app.use("/api/lecturer", LecturerRoute);
app.use("/api/course", CourseRoute);

// ErrorHandling Middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Error!!! Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8800;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }

// app.listen(8800, () => {
    
//     console.log("Server listening on port 8800")
// })

export default app;