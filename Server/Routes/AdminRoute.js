import express from "express";
import con from "../utils/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from "path";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router()


router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
        //   { role: "admin", email: email, id: result[0].id },
        //   "jwt_secret_key", //3812932sjad34&*@ -to use
          "4781SIWES9912sjad34&*@",
        //   process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie('token', token)
        const tryTk = token;
        return res.json({ loginStatus: true, role: "admin", token: token });
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password", token: token });
      }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})



//role protected accss
router.use(authMiddleware, roleMiddleware('admin'));
// , authMiddleware, checkRole(['admin'])
  

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    // con.query(sql, authMiddleware, checkRole(['admin']), (err,result) => {
    con.query(sql, (err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.get('/company', (req, res) => {
    const sql = "SELECT * FROM company";
    con.query(sql, (err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_company', (req, res) => {
    const sql = `INSERT INTO company 
                (name, address, phone_number) 
                VALUES (?)`;
    const values = [
        req.body.name,
        req.body.address,
        req.body.phone_number
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

// image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end image upload

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.post('/add_student', (req, res) => {
    const sql = `INSERT INTO student 
    (name, matric_no, email, category_id) 
    VALUES (?)`;
        const values = [
            req.body.name,
            req.body.matric_no,
            req.body.email,
            req.body.category_id
        ]
        
        // const inputName = req.body.name;
        // const inputMatric = req.body.matric_no;
        // const inputEmail = req.body.email;
        // const inputCategoryID = req.body.category_id;

        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
})

router.post('/add_school_supervisor', (req, res) => {
    const sql = `INSERT INTO school_supervisor
    (name, staff_id, email, password, category_id, school) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.staff_id,
            req.body.email,
            hash,
            req.body.category_id,
            req.body.school,
        ]

        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.post('/add_industry_supervisor', (req, res) => {
    const sql = `INSERT INTO industry_supervisor
    (name, email, password, phone_number, category_id, company_id, position) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.phone_number,
            req.body.category_id,
            req.body.company_id,
            req.body.position,
        ]

        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student', (req, res) => {
    const sql = "SELECT * FROM student";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/school_supervisor', (req, res) => {
    const sql = "SELECT * FROM school_supervisor";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/industry_supervisor', (req, res) => {
    const sql = "SELECT * FROM industry_supervisor";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/student_first_login', (req, res) => {
    const sql = `UPDATE student 
    SET password = ? 
    WHERE email = ? AND matric_no = ?`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            hash,
            req.body.test_email,
            req.body.test_matric_no,
        ]
        con.query(sql, [values[0], values[1], values[2]], (err, result) => {
            if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
        })
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE student 
        set name = ?, matric_no = ?, email = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.matric_no,
        req.body.email,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from student where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student_count', (req, res) => {
    const sql = "select count(id) as student from student";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/school_supervisor_count', (req, res) => {
    const sql = "select count(id) as school_supervisor from school_supervisor";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/industry_supervisor_count', (req, res) => {
    const sql = "select count(id) as industry_supervisor from industry_supervisor";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/industry_supervisor_count', (req, res) => {
    const sql = "select count(id) as industry_supervisor from industry_supervisor";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/company_count', (req, res) => {
    const sql = "select count(id) as company from company";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/pending_count', (req, res) => {
    const sql = "select count(id) as pending_details from pending_details";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/pending_company', (req, res) => {
    const sql = "select * from pending_details WHERE role = ?";
    con.query(sql, 'company',(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/pending_industry_supervisor', (req, res) => {
    const sql = "select * from pending_details WHERE role = ?";
    con.query(sql, 'industry_supervisor', (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/pending_school_supervisor', (req, res) => {
    const sql = "select * from pending_details WHERE role = ?";
    con.query(sql, 'school_supervisor',(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.post('/add_pending_company', (req, res) => {
    const values = [
        req.body.name,
        req.body.address,
        req.body.phone_number
    ]
    const checkCompanyExists = `SELECT * from company WHERE name = ? AND phone_number = ?`;

    con.query(checkCompanyExists, [req.body.name, req.body.phone_number], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (row.length > 0) {
            return res.status(409).json({ error: "Exists error", details: "Name and Phone number matched" });
        } else {
            const sql = `INSERT INTO company 
                (name, address, phone_number) 
                VALUES (?)`;
            con.query(sql, [values], (err, result) => {
                if(err) return res.json({Status: false, Error: err})
                return res.status(201).json({Status: true, message: "Company added successfully"})
            });
        }
    });
})

router.post('/add_pending_supervisorI', (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.phone_number,
        req.body.company_id,
        req.body.position,
        req.body.category_id
    ]
    const checkSuperviorIExists = `SELECT * from industry_supervisor WHERE name = ? AND phone_number = ?`;

    con.query(checkSuperviorIExists, [req.body.name, req.body.phone_number], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (row.length > 0) {
            return res.status(409).json({ error: "Exists error", details: "Name and Phone number matched" });
        } else {
            const sql = `INSERT INTO industry_supervisor 
                (name, email, password, phone_number, company_id, position, category_id) 
                VALUES (?)`;
            con.query(sql, [values], (err, result) => {
                if(err) return res.json({Status: false, Error: err})
                return res.status(201).json({Status: true, message: "Industry Supervisor added successfully"})
            });
        }
    });
})

router.post('/add_pending_supervisorS', (req, res) => {
    const values = [
        req.body.name,
        req.body.staff_id,
        req.body.email,
        req.body.password,
        req.body.school,
        req.body.category_id,
    ]
    const checkSuperviorIExists = `SELECT * from school_supervisor WHERE name = ? AND staff_id = ?`;

    con.query(checkSuperviorIExists, [req.body.name, req.body.phone_number], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        if (row.length > 0) {
            return res.status(409).json({ error: "Exists error", details: "Name and Phone number matched" });
        } else {
            const sql = `INSERT INTO school_supervisor 
                (name, staff_id, email, password, school, category_id) 
                VALUES (?)`;
            con.query(sql, [values], (err, result) => {
                if(err) return res.json({Status: false, Error: err})
                return res.status(201).json({Status: true, message: "School Supervisor added successfully"})
            });
        }
    });
})


router.delete('/delete_pending_details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from pending_details where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

export {router as adminRouter}