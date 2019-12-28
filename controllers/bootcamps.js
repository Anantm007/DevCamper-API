// @desc    Get all Bootcamps
// @route   GET /api/vi/bootcamps
// @access  Public
exports.getBootcamps = async(req, res, next) => {
    res.status(200).json({msg: "Show all bootcamps"})
}

// @desc    Get a single Bootcamps
// @route   GET /api/vi/bootcamps/:id
// @access  Public
exports.getBootcamp = async(req, res, next) => {
    res.status(200).json({msg: `Show bootcamp ${req.params.id}`})
}


// @desc    Create a Bootcamp
// @route   POST /api/vi/bootcamps
// @access  Private
exports.createBootcamp = async(req, res, next) => {
    res.status(200).json({msg: `Create a Bootcamp`})
}


// @desc    Update a single Bootcamps
// @route   PUT /api/vi/bootcamps/:id
// @access  Private
exports.updateBootcamp = async(req, res, next) => {
    res.status(200).json({msg: `Update bootcamp ${req.params.id}`})
}


// @desc    Delete a single Bootcamps
// @route   DELETE /api/vi/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async(req, res, next) => {
    res.status(200).json({msg: `Delete bootcamp ${req.params.id}`})
}