import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { CheckLecturer, getLecturer } from "../controllers/lecturer.js";

const router = express.Router();

// GET LECTURER THAT IS AUTHENTICATED
// router.get("/:id", verifyUser, getStudent);
router.get("/:id", getLecturer);


// GET LECTURER WITHOUT BEEIN AUTHENTICATED
router.get("/get-user/:id", getLecturer);


// THIS ROUTE IS USE TO CHECK USER IF IT EXIST OR NOT WHEN LECTURER  IS TRYING TO SIGN UP
router.post("/check-lecturer", CheckLecturer);

export default router