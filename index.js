const express = require('express');
const app = express();

const mongoose = require('mongoose')
const User = require('./User.js');

const Courses = require('./Courses.js')

mongoose.connect('mongodb+srv://Jatin:Jatin%40050208@cluster0.fwmw9.mongodb.net/')
.then(console.log("Successfully connected to MongoDB"))
.catch(function(err) {console.log("Failed to connect",err)})


app.get('/',function(req , res) {
    res.send('Hello, Jatin! Your server is running.');

});

app.use(express.json());

app.post('/signup',async function(req,res){
    try{
        const {username,password} = req.body;

        if (!username || !password) {

            return res.status(400).json({ message: "Username and password are required." });
         }

         
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"User with this username already exist!"});
        }
         
        const newUser = new User({username,password});

        await newUser.save();

        res.status(201).json({message:"User created Successfully"});
    } catch(error){

        console.log("Error! creating user", error);
        res.status(404).json({message:"Inputs Error!"});

    }
});


app.post('/newCourses', async function (req, res) {
    
    try{

        const {username,password} = req.body;
        const {CourseName,CoursePrice} = req.body;

        const existingUser = await User.findOne({username});
        const existingUserPass = await User.findOne({password});
        console.log(existingUser);
        if(!existingUser){
            return res.status(400).json({message:"Please sign up first for creating a course"});
        }
        if(!existingUserPass){
            return res.status(400).json({message:"Incorrect Password!"});

        }

        const newCourse = new Courses({CourseName,CoursePrice});
        await newCourse.save();

        res.status(201).json({message:"Course created Successfully!"});
    }
    catch(error){
        console.log("Error! creating user", error);
        res.status(400).json({message:"Some error in creating a course"});
    }
})




app.listen(3000);
