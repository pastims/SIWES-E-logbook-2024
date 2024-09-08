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


router.post("/school_supervisor_login", (req, res) => {
    const sql = "SELECT * from school_supervisor Where staff_id = ?";
    const staff_id_login = req.body.staff_id.toString().toUpperCase();
    con.query(sql, [staff_id_login], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const staff_id = result[0].staff_id;
                const token = jwt.sign(
                    { role: "school_supervisor", staff_id: staff_id, id: result[0].id },
                    "4781SIWES9912sjad34&*@",
                    { expiresIn: "1h" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id, role: "school_supervisor", token: token });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong Staff ID or password" });
      }
    });
  });

  
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  
// router.use(checkRole('school_supervisor'));
router.use(authMiddleware, roleMiddleware('school_supervisor'));


  router.get('/get_detail/:id', idMiddleware, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM school_supervisor where id = ?"
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


router.get('/view_week/:id', (req, res) => {
  const id = req.params.id;
  // const sql = `SELECT (week_number, monday, tuesday, wednesday, thursday, friday, saturday, week_project, student_id) 
  const sql = "SELECT * FROM logbook Where student_id = ?"
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Status: false});
      return res.json(result)
  })
})

router.get('/get_week_image/:id', (req, res) => {
  const id = req.params.id;
  // const sql = `SELECT (week_number, monday, tuesday, wednesday, thursday, friday, saturday, week_project, student_id) 
  // const sql = "SELECT (week_number, week_image) FROM logbook Where student_id = ?"
  const sql = "SELECT * FROM logbook Where student_id = ?"
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

  router.get('/logbook/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT logbook where student_id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.post('/save_supcomment', (req, res) => {
    // const id = req.params.id;
    // const image = upload.single(req.body.image)
    const sql = `UPDATE student
    SET school_supervisor_comment = ? 
    WHERE id = ?`
    const values = {
        comment: req.body.comment,
        student_id: req.body.student_id
    }
    con.query(sql, [values.comment, values.student_id], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

  export {router as SchoolSupervisorRouter}