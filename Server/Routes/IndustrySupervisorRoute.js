import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from "path";
// import { timeStamp } from 'console';

const router = express.Router()

router.post("/industry_supervisor_login", (req, res) => {
    const sql = "SELECT * from industry_supervisor Where email = ?";
    const email_login = req.body.email.toString().toUpperCase();
    con.query(sql, [email_login], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "industry_supervisor", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/get_detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM industry_supervisor where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.post('/search_student', (req, res) => {
    const matric_no = req.body.matric_no;
    const sql = "SELECT * FROM student where matric_no = ?";
    con.query(sql, [matric_no], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.post('/save_supcomment', (req, res) => {
    // const id = req.params.id;
    // const image = upload.single(req.body.image)
    const sql = `UPDATE logbook
    SET industry_supervisor_comment = ? 
    WHERE student_id = ? AND week_number = ?`
    const values = {
        comment: req.body.comment,
        student_id: req.body.student_id,
        week_no: req.body.week_no,
    }
    con.query(sql, [values.comment, values.student_id, values.week_no], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})


  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as IndustrySupervisorRouter}