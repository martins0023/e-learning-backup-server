import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { getStudent, CheckStudent } from "../controllers/student.js";

const router = express.Router();

// GET STUDENT THAT IS AUTHENTICATED
// router.get("/:id", verifyUser, getStudent);
router.get("/:id", getStudent);

// GET STUDENT WITHOUT BEEIN AUTHENTICATED
router.get("/get-user/:id", getStudent);

// THIS ROUTE IS USE TO CHECK USER IF IT EXIST OR NOT WHEN STUDENT IS TRYING TO SIGN UP
router.post("/check-student", CheckStudent);

export default router;