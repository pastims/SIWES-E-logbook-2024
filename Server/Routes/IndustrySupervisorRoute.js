import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from "path";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { idMiddleware } from '../middleware/idMiddleware.js';

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
                    "4781SIWES9912sjad34&*@",
                    { expiresIn: "1h" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id, role: 'industry_supervisor', token: token });
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

  
// router.use(checkRole('industry_supervisor'));
router.use(authMiddleware, roleMiddleware('industry_supervisor'));

  router.get('/get_detail/:id', idMiddleware, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM industry_supervisor where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.get('/get_company/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM company where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
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

  router.post('/search_student', (req, res) => {
    const matric_no = req.body.matric_no;
    const sql = "SELECT * FROM student where matric_no = ?";
    con.query(sql, [matric_no], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/view_week/:id', (req, res) => {
  const id = req.params.id;
  // const sql = `SELECT (week_number, monday, tuesday, wednesday, thursday, friday, saturday, week_project, student_id) 
  const sql = "SELECT * FROM logbook Where student_id = ?"
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Status: false});
      return res.json(result)
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

  export {router as IndustrySupervisorRouter}