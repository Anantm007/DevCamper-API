const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async")
const ErrorResposne = require("../utils/errorResponse");   

// @desc    Get all Bootcamps
// @route   GET /api/vi/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {

        const bootcamps = await Bootcamp.find();

        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
});

// @desc    Get a single Bootcamps
// @route   GET /api/vi/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async(req, res, next) => {
    
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        if(!bootcamp)
        {
            // Id format is correct but the bootcamp is not there
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success: true, data: bootcamp});
});


// @desc    Create a Bootcamp
// @route   POST /api/vi/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        })
});


// @desc    Update a single Bootcamps
// @route   PUT /api/vi/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp)
        {
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({success: true, data: bootcamp});    
    
});


// @desc    Delete a single Bootcamps
// @route   DELETE /api/vi/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp)
        {
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success: true, msg: "Deleted"});    

   

});