const { pool } = require("../db_configuration/db");

exports.create_education_details = async (req, res) => {
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
    let studentid, institute_name,qualification_category,year_of_passing;
    if (Object.keys(errors).length === 0) {
        if (bodykeys.includes('studentid')) {
            studentid = req.body.studentid;
            if (!studentid) {
                errors.studentid = [];
                errors.studentid.push(`studentid is required`);
            }
        } else {
            errors.studentid = [];
            errors.studentid.push(`studentid should be provided in the request body`);
        }
        if (bodykeys.includes('institute_name')) {
            institute_name = req.body.institute_name;
            if (!institute_name) {
                errors.institute_name = [];
                errors.institute_name.push(`institute_name is requred`);
            }
        } else {
            errors.institute_name = [];
            errors.institute_name.push(`institute_name should be provided in the request body`);
        }
        if (bodykeys.includes('qualification_category')) {
            qualification_category = req.body.qualification_category;
            if (!qualification_category) {
                errors.qualification_category = [];
                errors.qualification_category.push(`qualification_category is requred`);
            }
        } else {
            errors.qualification_category = [];
            errors.qualification_category.push(`qualification_category should be provided in the request body`);
        }
        if (bodykeys.includes('year_of_passing')) {
            year_of_passing = req.body.year_of_passing;
            if (!year_of_passing) {
                errors.year_of_passing = [];
                errors.year_of_passing.push(`year_of_passing is requred`);
            }
        } else {
            errors.year_of_passing = [];
            errors.year_of_passing.push(`year_of_passing should be provided in the request body`);
        }
    }
    let query, result, createdat;
    if (Object.keys(errors).length === 0) {
        createdat = new Date().getTime();
        try {
            query = {
                text: `INSERT INTO educational_details (studentid,institute_name,qualification_category,year_of_passing,createdat) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
                values: [studentid, institute_name, qualification_category,year_of_passing,createdat]
            }
            result = await pool.query(query);
            success.success = [];
            success.success.push(result.rows);
        } catch (err) {
            errors.query = [];
            errors.query.push(`Unable to create educational_details :: ${err}`)
        }
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({ status: "SUCCESS", message: success.success })
    } else {
        res.status(400).json({ status: "ERROR", message: errors })
    }
}

exports.update_education = async (req, res) => {
    let errors = {};
    let success = {};
    let body = req.body;
    let bodykeys = Object.keys(body);
    let studentid, institute_name,qualification_category,year_of_passing;
    if (Object.keys(errors).length === 0) {
        if (bodykeys.includes('id')) {
            id = req.body.id;
            if (!id) {
                errors.id = [];
                errors.id.push(`id is required`);
            }
        } else {
            errors.id = [];
            errors.id.push(`id should be provided in the request body`);
        }
        if (bodykeys.includes('studentid')) {
            studentid = req.body.studentid;
            if (!studentid) {
                errors.studentid = [];
                errors.studentid.push(`studentid is required`);
            }
        } else {
            errors.studentid = [];
            errors.studentid.push(`studentid should be provided in the request body`);
        }
        if (bodykeys.includes('institute_name')) {
            institute_name = req.body.institute_name;
            if (!institute_name) {
                errors.institute_name = [];
                errors.institute_name.push(`institute_name is requred`);
            }
        } else {
            errors.institute_name = [];
            errors.institute_name.push(`institute_name should be provided in the request body`);
        }
        if (bodykeys.includes('qualification_category')) {
            qualification_category = req.body.qualification_category;
            if (!qualification_category) {
                errors.qualification_category = [];
                errors.qualification_category.push(`qualification_category is requred`);
            }
        } else {
            errors.qualification_category = [];
            errors.qualification_category.push(`qualification_category should be provided in the request body`);
        }
        if (bodykeys.includes('year_of_passing')) {
            year_of_passing = req.body.year_of_passing;
            if (!year_of_passing) {
                errors.year_of_passing = [];
                errors.year_of_passing.push(`year_of_passing is requred`);
            }
        } else {
            errors.year_of_passing = [];
            errors.year_of_passing.push(`year_of_passing should be provided in the request body`);
        }
    }
    let update_education, returning_data, update_at;
    if (Object.keys(errors).length === 0) {
        update_at = new Date().getTime();
        try {
            update_education = {
                text: `UPDATE educational_details SET studentid=$1, institute_name=$2,qualification_category=$3,year_of_passing=$4,updatedat=$5 WHERE id='${id}' RETURNING *`,
                values: [studentid, institute_name, qualification_category,year_of_passing,update_at]
            }
            returning_data = await pool.query(update_education);
            success.success = []
            success.success.push(returning_data.rows)
        } catch (err) {
            errors.servererror = []
            errors.servererror.push(`Error while educaiton_deatils updating :: ${err}`)
        }
    }
    if (Object.keys(errors).length === 0) {
        return res.status(200).json({ status: 'SUCCESS', data: success.success })

    } else {
        return res.status(400).json({ status: "ERROR", errors: errors })
    }
}

exports.delete_education = async (req, res) => {
    let errors = {};
    let success = {};
    let id = req.params.id;
    console.log(id)
    if (Object.keys(errors).length === 0) {
        try {
            delete_student = {
                text: `DELETE FROM educational_details WHERE id='${id}';`
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

exports.get_education = async (req, res) => {
    let errors = {};
    let success = {};
    let result;
    try {
        result = await pool.query(`SELECT * FROM educational_details`);
        success.success = [];
        success.success.push(result.rows[0]);
    } catch (err) {
        errors.query = [];
        errors.query.push(`Unable to get educational_details :: ${err}`)
    }
    if (Object.keys(errors).length === 0) {
        res.status(200).json({ status: "SUCCESS", data: success.success });
    } else {
        res.status(400).json({ status: "ERROR", errors: errors });
    }
}