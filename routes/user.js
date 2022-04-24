const { requireSignin } = require('../middlewares');
const { user_register, user_login } = require('../controllers/auth');
const { create_education_details, update_education, delete_education, get_education } = require('../controllers/education_details');
const { create_student, get_students, update_student, students_delete, get_all_students_data } = require('../controllers/students');

const Router = require('express').Router()

Router.post('/register',user_register); // create a user
Router.post('/login',user_login); // User login
Router.post('/student',requireSignin,create_student); // create student
Router.get('/student',requireSignin,get_students); // get students
Router.put('/student',requireSignin,update_student); // update students
Router.delete('/student/:id',requireSignin,students_delete); // delete student
Router.post('/education',requireSignin,create_education_details);//create education details
Router.put('/education',requireSignin,update_education); // updating studient education details
Router.get('/education',requireSignin,get_education); // get all studient education details
Router.delete('/education/:id',requireSignin,delete_education); // delete studient education details
Router.get('/studends_data',requireSignin,get_all_students_data); // all data to the students

module.exports = Router;