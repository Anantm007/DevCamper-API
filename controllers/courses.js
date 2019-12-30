const Course = require("../models/Course");
const asyncHandler = require("../middleware/async")
const ErrorResposne = require("../utils/errorResponse");   

// @desc    Get all Bootcamps
// @route   GET /api/vi/bootcamps
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async(req, res, next) => {
    let query;

    if(req.params.bootcampId)
    {
        query = Course.find({bootcamp: req.params.bootcampId});
    } else {
        query = Course.find();
    }

    const courses = await query;

    res.status(200).json({
        succcess: true,
        count: courses.length,
        data: courses
    })
})