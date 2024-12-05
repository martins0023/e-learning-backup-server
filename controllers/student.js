import Student from "../models/student.js";
import { createError } from "../utils/error.js";

export const getStudent = async(req, res, next) => {
    const _id = req.params.id;
    try {
        const student = await Student.findOne({_id});
        if(!student) return next(createError(400, "Student not found"));
        const {password, role, isAdmin, ...data} = student
        res.status(200).json({message: "Success!", data: {...data._doc}})
    } catch(err) {
        next(err)
    }
}

export const CheckStudent = async(req, res, next) => {
    const {matric_no} = req.body;
    try {
        const student = await Student.findOne({matric_no});
        if(!student) return next(createError(400, "Matric No not found"));
        const {password, role, isAdmin, ...data} = student
        res.status(200).json({message: "Success!", data: {...data._doc}})
    } catch(err) {
        next(err)
    }
}