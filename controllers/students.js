const { pool } = require("../db_configuration/db");

exports.create_student = async (req, res) => {
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
    let name, rollno;
    if (Object.keys(errors).length === 0) {
        if (bodykeys.includes('name')) {
            name = req.body.name;
            if (!name) {
                errors.name = [];
                errors.name.push(`Name is required`);
            }
        } else {
            errors.name = [];
            errors.name.push(`Name should be provided in the request body`);
        }
        if (bodykeys.includes('rollno')) {
            rollno = req.body.rollno;
            if (!rollno) {
                errors.rollno = [];
                errors.rollno.push(`Rollno is requred`);
            }
            const user_found = await pool.query(`SELECT rollno FROM students WHERE rollno='${rollno}'`);
            if (user_found.rows[0] != undefined) {
                errors.username = [];
                errors.username.push('Rollno must be unique')
            }
        } else {
            errors.rollno = [];
            errors.rollno.push(`Rollno should be provided in the request body`);
        }
    }
    let query, result, createdat;
    if (Object.keys(errors).length === 0) {
        createdat = new Date().getTime();
        try {
            query = {
                text: `INSERT INTO students (name,rollno,createdat) VALUES ($1,$2,$3) RETURNING *`,
                values: [name, parseInt(rollno), createdat]
            }
            result = await pool.query(query);
            success.success = [];
            success.success.push(result.rows);
        } catch (err) {
            errors.query = [];
            errors.query.push(`Unable to create student :: ${err}`)
        }
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({ status: "SUCCESS", message: success.success })
    } else {
        res.status(400).json({ status: "ERROR", message: errors })
    }
}

exports.get_students = async (req, res) => {
    let errors = {};
    let success = {};
    let result;
    try {
        result = await pool.query(`SELECT * FROM students`);
        success.success = [];
        success.success.push(result.rows[0]);
    } catch (err) {
        errors.query = [];
        errors.query.push(`Unable to get students :: ${err}`)
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({ status: "SUCCESS", data: success.success });
    } else {
        res.status(400).json({ status: "ERROR", errors: errors });
    }
}

exports.update_student = async (req, res) => {
    let errors = {};
    let success = {};
    let body = req.body;
    let bodykeys = Object.keys(body);
    let name, rollno, id;
    if (Object.keys(errors).length === 0) {
        if (bodykeys.includes('name')) {
            name = req.body.name;
            if (!name) {
                errors.name = [];
                errors.name.push(`Name is required`)
            }
        } else {
            errors.name = [];
            errors.name.push(`name should be provided in the request body`);
        }
        if (bodykeys.includes('rollno')) {
            rollno = req.body.rollno;
            if (!rollno) {
                errors.rollno = [];
                errors.rollno.push(`Rollno is required`)
            }
        } else {
            errors.rollno = [];
            errors.rollno.push(`Rollno should be provided in the request body`);
        }
        if (bodykeys.includes('id')) {
            id = req.body.id;
            if (!id) {
                errors.id = [];
                errors.id.push(`Id is required`)
            }
        } else {
            errors.id = [];
            errors.id.push(`Id should be provided in the request body`);
        }
    }
    let update_student, returning_data, update_at;
    if (Object.keys(errors).length === 0) {
        update_at = new Date().getTime();
        try {
            update_student = {
                text: `UPDATE students SET name=$1, rollno=$2,updatedat=$3 WHERE id='${id}' RETURNING *`,
                values: [name, rollno, update_at]
            }
            returning_data = await pool.query(update_student);
            success.success = []
            success.success.push(returning_data.rows)
        } catch (err) {
            errors.servererror = []
            errors.servererror.push(`Error while student updating :: ${err}`)
        }
    }
    if (Object.keys(errors).length === 0) {
        return res.status(200).json({ status: 'SUCCESS', data: success.success })

    } else {
        return res.status(400).json({ status: "ERROR", errors: errors })
    }
}

exports.students_delete = async (req, res) => {
    let errors = {};
    let success = {};
    let id = req.params.id;
    console.log(id)
    if (Object.keys(errors).length === 0) {
        try {
            delete_student = {
                text: `DELETE FROM students WHERE id='${id}';`
            }
            await pool.query(delete_student);
            success.success = [];
            success.success.push('Okay')
        } catch (err) {
            errors.servererror = []
            errors.servererror.push(`Error while student updating :: ${err}`)
        }
    }
    if (Object.keys(errors).length === 0) {
        return res.status(200).json({ status: 'SUCCESS', data: success.success })

    } else {
        return res.status(400).json({ status: "ERROR", errors: errors })
    }

}

exports.get_all_students_data = async (req, res) => {
    let success = {};
    let errors = {};
    let result;
    try {
        result = await pool.query(`SELECT w.name,w.rollno, r.institute_name, r.qualification_category, r.year_of_passing FROM "public".students w 
        INNER JOIN "public".educational_details r ON ( w.id = r.studentid );`);
        success.success = [];
        success.success.push(result.rows[0])
    } catch (err) {
        errors.query = [];
        errors.query.push(`Unable to get students :: ${err}`);
    }
    if (Object.keys(errors).length === 0) {
        return res.status(200).json({ status: 'SUCCESS', data: success.success })

    } else {
        return res.status(400).json({ status: "ERROR", errors: errors })
    }
}

