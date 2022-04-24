const { pool } = require("../db_configuration/db");
const { hashPassword, comparePassword } = require("../utils/auth");
const jwt = require('jsonwebtoken');

exports.user_register = async(req,res)=>{
    let errors = {}
    let success = {}
    let body = req.body;
    let bodykeys = Object.keys(body);
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        }
        catch (err) {
            if (!errors.action) {
                errors.action = [];
            }
            errors.action.push('Unable to parse request body. ' + err.message);
        }
    }
    let username,password;
    if (Object.keys(errors).length === 0) {
        if(bodykeys.includes("username")){
            username = req.body.username;
            if(!username){
                errors.username = [];
                errors.username.push('Username is required')
            }
            const user_found = await pool.query(`SELECT username FROM users WHERE username='${username}'`);
            if(user_found.rows[0] != undefined){
                errors.username = [];
                errors.username.push('The username is already taken')
            }
        }else{
            errors.username = [];
            errors.username.push('username should be provided in the request body')
        }
        if(bodykeys.includes("password")){
            password = req.body.password;
            if(!password){
                errors.password = [];
                errors.password.push('Password is required');
            }
            if(password.length <6){
                errors.password = [];
                errors.password.push('Password should 6 char')
            }
        }
    }
    let createdat, query, result,encrypt_pass;
    if (Object.keys(errors).length === 0){
        createdat = new Date().getTime();
        encrypt_pass = await hashPassword(password);
        try{
            query = {
                text: `INSERT INTO users (username,password,createdat) VALUES ($1,$2,$3) RETURNING *`,
                values: [username, encrypt_pass, createdat]
            }
            result = await pool.query(query);
            success.success = [];
            success.success.push(result.rows);
        }catch(err){
            errors.query = [];
            errors.query.push(`Unable to create user :: ${err}`);
        }
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({ status: "SUCCESS", data: success });
    } else {
        res.status(400).json({ status: "ERROR", errors: errors });
    }
}

exports.user_login = async(req,res)=>{
    let errors = {}
    let success = {}
    let body = req.body;
    let bodykeys = Object.keys(body);
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        }
        catch (err) {
            if (!errors.action) {
                errors.action = [];
            }
            errors.action.push('Unable to parse request body. ' + err.message);
        }
    }
    let username,password, user_found;
    if (Object.keys(errors).length === 0) {
        if(bodykeys.includes('username')){
            username = req.body.username;
            if(!username){
                errors.username = [];
                errors.username.push(`Username is required`);
            }
            user_found = await pool.query(`SELECT * FROM users WHERE username='${username}'`);
            if(user_found.rows[0] === undefined){
                errors.username = [];
                errors.username.push('User not found')
            }
        }else{
            errors.username = [];
            errors.username.push(`username should be provided in the request body`)
        }
        if(bodykeys.includes('password')){
            password = req.body.password;
            if(!password){
                errors.password = [];
                errors.password.push(`Password is required`);
            }
        }else{
            errors.password = [];
            errors.password.push(`password should be provided in the request body`)
        }
    }
    let pass_validation, token;
    if (Object.keys(errors).length === 0) {
        pass_validation = await comparePassword(password,user_found.rows[0].password)
        if(pass_validation){
            token = jwt.sign({ _id: user_found.rows[0].id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            success.success = [];
            success.success.push(token)
        }else{
            errors.password = [];
            errors.password.push('Password is incorrect')
        }
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({status:"SUCCESS",token:success.success})
    }else{
        res.status(400).json({status:"ERROR",message:errors})
    }
}