import express from 'express';
import { createCourse, getCourse, updateCourse, getLecturerCourse, getStudentCourse,  } from '../controllers/course.js';
import upload from '../utils/multer.js';


const router = express.Router();

// GET A COURSE BY ID
router.get("/:id", getCourse)

// GET A COURSE FOR PERTICULAR LxECTURER
router.get("/lecturer-course/:id", getLecturerCourse)

// GET A COURSE FOR PERTICULAR STUDENT IN A DEPARTMENT AND LEVEL
router.get("/course-student/student", getStudentCourse)

// POST - ADD NEW COURSE
router.post("/", upload.single("thumbnail"), createCourse)

// UPDATE
router.put("/:id", upload.array("image"), updateCourse)

export default router;