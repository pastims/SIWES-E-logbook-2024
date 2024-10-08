import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import { checkRole } from '../middleware/authMiddleware.js';

const router = express.Router()


router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    const email_login = req.body.email.toString().toUpperCase();
    con.query(sql, [email_login], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "4781SIWES9912sjad34&*@",
                    { expiresIn: "1h" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id, role: "employee", token: token });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  //==================GUEST CODE================================

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

  router.post('/submit_company', (req, res) => {
    const sql = `INSERT INTO pending_details 
                (role, name, address, phone_number) 
                VALUES (?)`;
    const values = [
        req.body.role,
        req.body.name,
        req.body.address,
        req.body.phone_number
    ]
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

  router.post('/submit_school_supervisor', (req, res) => {
    const sql = `INSERT INTO pending_details
    (role, name, staff_id, email, password, school) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.role,
            req.body.name,
            req.body.staff_id,
            req.body.email,
            hash,
            req.body.school,
        ]

        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.post('/submit_industry_supervisor', (req, res) => {
    const sql = `INSERT INTO pending_details
    (role, name, email, password, phone_number, company_id, position) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.role,
            req.body.name,
            req.body.email,
            hash,
            req.body.phone_number,
            req.body.company_id,
            req.body.position,
        ]

        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/company', (req, res) => {
    const sql = "SELECT * FROM company";
    con.query(sql, (err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

// router.use(checkRole('employee'));

  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })


  export {router as EmployeeRouter}