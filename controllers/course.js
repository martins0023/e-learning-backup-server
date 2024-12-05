import Course from "../models/course.js";
import cloudinary from "../utils/cloudinary.js";

export const getCourse = async (req, res, next) => {
  const id = req.params.id;
  try {
      const courses = await Course.findById(id);
      // if(!courses) return res.status(200).json({message: "Success!", data: []})
      res.status(200).json({message: "Success!", data: courses})
  } catch (err) {
    next(err);
  }
};

export const getLecturerCourse = async (req, res, next) => {
  const lecturer_id = req.params.id;
  try {
      const courses = await Course.find({lecturer_id});
      // console.log(courses);
      if(!courses) return res.status(200).json({message: "Success!", data: []})
      res.status(200).json({message: "Success!", data: courses})
  } catch (err) {
    next(err);
  }
};

export const getStudentCourse = async (req, res, next) => {
  const {level, department} = req.query;
  console.log({level, department})
  console.log(req.query)
  try {
      const courses = await Course.find({level: level, department: department}).populate("lecturer_id");
      // console.log(courses);
      if(!courses) return res.status(200).json({message: "Success!", data: []})
      res.status(200).json({message: "Success!", data: courses})
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  const { ...body } = req.body;

  // if(req.file.fieldname == "thumbnail") {
  //   const result = await cloudinary.uploader.upload(req.file.path, { upload_preset: 'uploads'})
  //   if(!result) next(createError(401, "An Error occurred while uploading. Try again!!!"));
  //   body.thumbnail = result.secure_url;
  // }

  try {
      const newCourse = await new Course({ ...body });
      await newCourse.save();
      res.status(200).json({message: "Course saved successfully"})
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  const updatedData = {...req.body}; 
  try {
    // const result = await cloudinary.uploader.upload(req.file.path,  { upload_preset: 'uploads'})
    // console.log(result)

      const newCourse = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });
      res.status(200).json({message: "Course saved successfully", data: newCourse._doc});
  } catch (err) {
    console.log(err)
    next(err); 
  }
};
