const Bootcamp = require("../models/Bootcamp");
const ErrorResposne = require("../utils/errorResponse");   

// @desc    Get all Bootcamps
// @route   GET /api/vi/bootcamps
// @access  Public
exports.getBootcamps = async(req, res, next) => {

    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps});
    } catch (err) {
        next(err);
      }
}

// @desc    Get a single Bootcamps
// @route   GET /api/vi/bootcamps/:id
// @access  Public
exports.getBootcamp = async(req, res, next) => {
    
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        
        if(!bootcamp)
        {
            // Id format is correct but the bootcamp is not there
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success: true, data: bootcamp});

    } catch (err) {
        // Incorrectly formatted / invalid mongoDB object id
        next(err);
    }
}


// @desc    Create a Bootcamp
// @route   POST /api/vi/bootcamps
// @access  Private
exports.createBootcamp = async(req, res, next) => {
    
    try { 
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        })

    } catch (err) {
        next(err);
    }
}


// @desc    Update a single Bootcamps
// @route   PUT /api/vi/bootcamps/:id
// @access  Private
exports.updateBootcamp = async(req, res, next) => {
    
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp)
        {
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
    
        res.status(200).json({success: true, data: bootcamp});    
    } catch (err) {
        next(err);
    }
    
}


// @desc    Delete a single Bootcamps
// @route   DELETE /api/vi/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async(req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if(!bootcamp)
        {
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success: true, msg: "Deleted"});    

    } catch (err) {
        next(err);
    }


}