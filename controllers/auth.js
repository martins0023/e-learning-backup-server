import Lecturer from "../models/lecturer.js";
import Student from "../models/student.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { ...body } = req.body;

  if (req.body.role == "student") {
    try {
      const newUser = await new Student({
        ...body,
      });

      await newUser.save();
      res.status(200).json({ message: "Student saved successfully" });
    } catch (err) {
      next(err);
    }
  }

  if (req.body.role == "lecturer") {
    try {
      const newUser = await new Lecturer({
        ...body,
      });

      await newUser.save();
      res.status(200).json({ message: "Lecturer saved successfully" });
    } catch (err) {
      next(err);
    }
  }
};

export const signUp = async (req, res, next) => {

  if (req.body.role == "student") {
    console.log(req.body?.password)
    try {
      const student = await Student.findOne({ _id: req.params.id });
      if (!student) {
        next(createError(400, "Student not found"));
      } else {
        if (!student.password) {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(req.body?.password, salt);

        const updateStudent = await Student.findByIdAndUpdate(req.params.id, {password: hashPassword}, { new: true})
        const {password, role, isAdmin, ...data} = updateStudent
        res.status(200).json({ message: "Student password updated successfully", data: {...data._doc}, success: true });

        } else {
          next(createError(400, "Account has been created before, Please proceed to login"));
        }
      }
    } catch (err) {
      next(err);
    }
  }

  if (req.body.role == "lecturer") {
    try {
        const lecturer = await Lecturer.findOne({ _id: req.params.id });
        if (!lecturer) {
          next(createError(400, "lecturer not found"));
        } else {
          if (!lecturer.password) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(req.body.password, salt);
  
          const updatelecturer = await Lecturer.findByIdAndUpdate(req.params.id, {password: hashPassword}, { new: true})
          const {password, role, isAdmin, ...data} = updatelecturer
          res.status(200).json({ message: "lecturer password updated successfully", data: {...data._doc}, success: true });
  
          } else {
            next(createError(400, "Account has been created before, Please proceed to login"));
          }
        }
      } catch (err) {
        next(err);
      }
  }
};



export const login = async (req, res, next) => {

    if(req.body.role == "student") {
        try {
            const student = await Student.findOne({matric_no: req.body.matric_no})
            if(!student) {
                next(createError(405, "Student not found"))
            } else {
                const isMatch = bcrypt.compareSync(req.body.password, student.password)
                if(!isMatch) {
                    next(createError(400, "Invalid Password"))
                } else {
                    const token = jwt.sign({id: student._id, role: student.role, isAdmin: student.isAdmin}, process.env.JWT)
                    const { password, ...data} = student
                    res.cookie("access_token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'development' ? 'None' : 'Lax',
                        path: "/"
                    }).status(200).json({ message: "Login successful", data: {...data._doc}, success: true });
                }
            }
        } catch (err) {
            next(err);
        }
    }

    if(req.body.role == "lecturer") {
        try {
            const lecturer = await Lecturer.findOne({staff_id: req.body.staff_id})
            if(!lecturer) {
                next(createError(405, "Lecturer not found"))
            } else {
                const isMatch = bcrypt.compareSync(req.body.password, lecturer.password)
                if(!isMatch) {
                    next(createError(400, "Invalid Password"))
                } else {
                    const token = jwt.sign({id: lecturer._id, role: lecturer.role, isAdmin: lecturer.isAdmin}, process.env.JWT)
                    const { password, role, isAdmin,...data} = lecturer
                    res.cookie("access_token", token, {
                        httpOnly: true,
                    }).status(200).json({ message: "Login successful", data: {...data._doc}, success: true });
                }
            }
        } catch (err) {
            next(err);
        }
    }

};

