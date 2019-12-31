const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async")
const ErrorResposne = require("../utils/errorResponse");   
const geoCoder = require('../utils/geocoder');

// @desc    Get all Bootcamps
// @route   GET /api/vi/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
        let query;

        // Cpoy req.query
        const reqQuery = {...req.query};

        // Fields to exclude from the req.query as they have a special meaning
        const removeFields = ['select', 'sort', 'limit', 'page'];

        // Loop over removeFields and delete them from req.query
        removeFields.forEach(param => delete reqQuery[param]);

        // Create Query String
        let queryStr = JSON.stringify(reqQuery);

        // Creates Operators ($gt, gte etc.)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
        
        // Finding resource
        query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');
        
        // Se;ect Fields
        if(req.query.select)
        {
            // Split comma separated values into array and join them with a single space (' ')
            const fields = req.query.select.split(',').join(' ');
            console.log(fields);

            query = query.select(fields);
        }

        // Sort
        if(req.query.sort)
        {
            // Split comma separated values into array and join them with a single space (' ')
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt'); // By default sort in descending order
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1; // Default page 1, 10 is the radix ot base
        const limit = parseInt(req.query.limit, 10) || 25;

        const startIndex = (page-1)*limit;
        const endIndex = page*limit;
        const total = await Bootcamp.countDocuments();  

        query = query.skip(startIndex).limit(limit)

        // Executing query
        const bootcamps = await query;

        // Pagination result
        const pagination = {}

        if(endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0)
        {
            pagination.prev = {
                page: page -1,
                limit
            }
        }

        res.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps})
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
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp)
        {
            return next(new ErrorResposne(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        // To trigger the middleware to cascade delete the courses (see bootcamp schema)
        bootcamp.remove();

        res.status(200).json({success: true, msg: "Deleted"});      
});


// @desc    Get bootcamps within a raius
// @route   GET /api/vi/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
   const {zipcode, distance} = req.params;

   // Get latitutde and longitude from geocoder
   const loc = await geoCoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   // Calculate radius using radians
   // Divide distance by rdius of Earth
   // Earth radius = 3,963 miles || 6.378 km
   const radius = distance / 3963;

   const bootcamps = await Bootcamp.find({
       location: {$geoWithin: { $centerSphere: [[ lng, lat], radius ]} }
   })

   res.status(200).json({
       success: true,
       count: bootcamps.length,
       data: bootcamps
   })

});