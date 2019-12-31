const express = require("express");
// controller methods
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse} = require("../controllers/courses")

const router = express.Router({mergeParams: true}); // mergeParams for re routing (see bootcamp route)


router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;