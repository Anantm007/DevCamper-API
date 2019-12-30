const express = require("express");
// controller methods
const {getCourses} = require("../controllers/courses")

const router = express.Router({mergeParams: true}); // mergeParams for re routing (see bootcamp route)


router.route("/").get(getCourses);

module.exports = router;