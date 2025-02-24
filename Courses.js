const mongoose = require("mongoose");
const CourseSchema= new mongoose.Schema({

    CourseName: {type: String, required: true},
    CoursePrice: {type: String, required: true}


});

module.exports=mongoose.model('Courses',CourseSchema);
