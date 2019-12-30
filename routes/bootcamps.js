const express = require("express");
const router = express.Router();

// controller methods
const {getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius} = require("../controllers/bootcamps")

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers 
router.use('/:bootcampId/courses', courseRouter); // A request with /:bootcampId/courses will be handled by the course routers


router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router;