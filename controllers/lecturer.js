import lecturer from "../models/lecturer.js";
import Lecturer from "../models/lecturer.js";
import { createError } from "../utils/error.js";

export const getLecturer = async(req, res, next) => {
    const _id = req.params.id;
    try {
        const lecturer = await Lecturer.findOne({_id});
        if(!lecturer) return next(createError(400, "Lecturer not found"))
        const {password, role, isAdmin, ...data} = lecturer
        res.status(200).json({message: "Success!", data: {...data._doc}})
    } catch(err) {
        next(err)
    }
}

export const CheckLecturer = async(req, res, next) => {
    const {staff_id} = req.body;
    try {
        const lecturer = await Lecturer.findOne({staff_id});
        if(!lecturer) return next(createError(400, "Staff Id not found"));
        const {password, role, isAdmin, ...data} = lecturer
        res.status(200).json({message: "Success!", data: {...data._doc}})
    } catch(err) {
        next(err)
    }
}