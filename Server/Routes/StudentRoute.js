import express, { response } from 'express'
import con from "../utils/db.js";
import axios from 'axios';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from "path";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { idMiddleware } from '../middleware/idMiddleware.js';
// import { getUser } from '../controller/urlController.js';

const router = express.Router()


router.post("/student_login", (req, res) => {
    const sql = "SELECT * from student Where matric_no = ?";
    const matric_no_login = req.body.matric_no.toString().toUpperCase();
    con.query(sql, [matric_no_login], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const matric_no = result[0].matric_no;
                const token = jwt.sign(
                    { role: "student", matric_no: matric_no, id: result[0].id },
                    "4781SIWES9912sjad34&*@",
                    { expiresIn: "1h" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id, role: 'student', token: token });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong matric number or password" });
      }
    });
  });

  
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  
// router.use(checkRole('student'));
router.use(authMiddleware, roleMiddleware('student'));

// const verifyToken = authMiddleware;
// idMiddleware(id)

  router.get(`/dashboard/:id`, idMiddleware, (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  
router.get('/company', (req, res) => {
    const sql = "SELECT * FROM company";
    con.query(sql, (err,result) => {
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

  router.get('/view_week/:id/:week_no', (req, res) => {
    // const id = req.params.id;
    // const week_no = req.params.week_no;
    const vals = {
        id : req.params.id,
        week_no : req.params.week_no
    }
    const sql = `SELECT (monday, tuesday, wednesday, thursday, friday, saturday, week_project) 
                FROM logbook WHERE student_id = ? and week_number = ?`
    // const sql = "SELECT * FROM logbook Where student_id = ?"
    con.query(sql, [vals], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.post('/get_week/:id', (req, res) => {
    const id = req.params.id;
    const week_no = req.body.week_number;
    const vals = {
        id : id,
        week_no : week_no,
    }
    const sql = `SELECT monday, tuesday, wednesday, thursday, friday, saturday, week_project, student_comment
                FROM logbook WHERE student_id = ? and week_number = ?`
    // const sql = "SELECT * FROM logbook Where student_id = ?"
    con.query(sql, [vals.id, vals.week_no], (err, result) => {
        if(err) return res.json({Status: false, Error: err});
        return res.json(result)
    })
  })


// image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Student_Pics')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end image upload

//imgur / IMGBB image upload
const IMGUR_CLIENT_ID = 'bb6970684d3a524';
const IMGBB_API_KEY = '689383609c5f170bdc6f66c6bfd1e996';

const storageImgur = multer.memoryStorage();
const uploadImgur = multer({ storageImgur });


const uploadToImgbb = (file) => {
    const imageData = file.buffer.toString('base64');

    // return axios.post(
    //     'https://api.imgbb.com/1/upload', 
    //     { 
    //         key: IMGBB_API_KEY,
    //         image: imageData,
    //     })
    return axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        image: imageData,
    })
    .then(response => {
        return response.data.data.url;
    })
    .catch(error => {
        throw new Error('Error uploading to Imgbb: ' + error.message + file + imageData);
    });
};

const uploadToImgur = async (file) => {
    const imageData = file.buffer.toString('base64');
    let retries = 3; // Set the number of retries

    while (retries > 0) {
        try {
            const response = await axios.post(
                'https://api.imgur.com/3/image',
                { image: imageData },
                {
                    headers: {
                        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                    },
                }
            );
            return response.data.data.link; // Return the image link on success
        } catch (err) {
            // Check if the error is a 503
            if (err.response && err.response.status === 503) {
                console.error('Service unavailable, retrying...');
                retries -= 1; // Decrement the retry counter
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
            } else {
                console.error('Error details:', err.response ? err.response.data : err.message);
                throw new Error('Error uploading to Imgur: ' + (err.response ? err.response.data : err.message));
            }
        }
    }
    throw new Error('Error uploading to Imgur: Max retries exceeded'); // Throw an error if all retries fail
};


// IMGUR OPTION ====================================
router.put('/student_image/:id', uploadImgur.single('image'), (req, res) => {
    const id = req.params.id;
    // const image = upload.single(req.body.image)

    // const imageUrl = await uploadToImgur(req.file);
    if (!req.file) {
        return res.status(400).json({ Status: false, Error: 'No file uploaded' });
    }

    // uploadToImgur(req.file)
    uploadToImgbb(req.file)
    .then(imageUrl => {
        const sql = `UPDATE student SET image = ? WHERE id = ?;`

        con.query(sql, [imageUrl, id], (err, result) => {
            if(err) return res.json({Status: false, Error: err});
    
            return res.json({Status: true, ImageUrl: imageUrl});
        })
    })
    .catch (err => {
        return res.json({ Status: false, Error: err.message });
    })
})


router.put('/add_week_image/:id', uploadImgur.single('image'), (req, res) => {
    const id = req.params.id;
    // const image = upload.single(req.body.image)
    // const image = req.file.filename;
    const week_no = req.body.week_no;
    
    uploadToImgbb(req.file)
    .then(imageUrl => {
            const sql = `UPDATE logbook SET week_image = ? WHERE student_id = ? and week_number = ?;`

            con.query(sql, [image, id, week_no], (err, result) => {
                if(err) return res.json({Status: false, Error: err})
                return res.json({Status: true, ImageUrl: imageUrl})
            })
        })
    .catch (err => {
        return res.json({Status: false, Error: err.message});
    })
}) 
//=================================

// BACKEND IMAGE OPTION
router.put('/student_image[PAUSED]/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    // const image = upload.single(req.body.image)
    const sql = `UPDATE student
    SET image = ?
    WHERE id = ?;`
    const value = req.file.filename;

    con.query(sql, [value, id], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

// week image upload
const image_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Week_Pics')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})


const image_upload = multer({
    storage: image_storage
})
// end week image upload


router.put('/add_week_image[PAUSED]/:id', image_upload.single('image'), (req, res) => {
    const id = req.params.id;
    // const image = upload.single(req.body.image)
    const sql = `UPDATE logbook
    SET week_image = ?
    WHERE student_id = ? and week_number = ?;`
    const image = req.file.filename;
    const week_no = req.body.week_no;

    con.query(sql, [image, id, week_no], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

router.put('/register_student/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    // const image = upload.single(req.body.image)
    const sql = `UPDATE student
    SET course = ?, year_study = ?, address = ?, phone_number = ?, company = ?, company_department = ?, date_start = ?
    WHERE id = ?;`
    const values = [
        req.body.course,
        req.body.year_study,
        req.body.address,
        req.body.phone_number,
        req.body.company,
        req.body.department,
        req.body.date_start,
        // req.body.industry_supervisor,
        // req.file.filename,
    ]
    con.query(sql, [...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

router.post('/add_week/:id', (req, res) => {
    const id = req.params.id;
    const entries = [
        req.body.week_number,
        req.body.monday,
        req.body.tuesday,
        req.body.wednesday,
        req.body.thursday,
        req.body.friday,
        req.body.saturday,
        req.body.week_project,
        req.body.student_comment,
        id,
    ]
        const sql = `INSERT INTO logbook
        (week_number, monday, tuesday, wednesday, thursday, friday, saturday, week_project, student_comment, student_id) 
        VALUES (?);`
    con.query(sql, [entries], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
    })
})

router.post('/add_daily/:id', (req, res) => {
    const id = req.params.id;
    const week_number = req.body.week_number;
    const type = req.body.type;
    const entry = req.body.entry;
    // const values = [
	// req.body.week_number,
	// req.body.type,
	// req.body.entry,
    // ]
   
    // SQL to check if the week number exists
    const checkWeekSql = `SELECT * FROM logbook WHERE week_number = ?`;
   
   con.query(checkWeekSql, [week_number], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }
       
        if (row) {
            // Week exists, update the corresponding day column
            const updateSql = `UPDATE logbook SET ${type} = ? WHERE week_number = ? and student_id = ?`;

            con.query(updateSql, [entry, week_number, id], function(err) {
                if (err) {
                    return res.status(500).json({ error: "Failed to update entry", details: err.message });
                }
                return res.status(200).json({ message: `Updated ${type} entry for week ${week_number}` });
            });
        } else {
            // Week does not exist, insert a new row
            const insertSql = `INSERT INTO logbook (week_number, student_id, ${type}) VALUES (?, ?, ?, ?)`;

            con.query(insertSql, [week_number, id, type, entry], function(err) {
                if (err) {
                    return res.status(500).json({ error: "Failed to insert entry", details: err.message });
                }
                return res.status(200).json({ message: `Created new entry for ${type} in week ${week_number}` });
            });
        }
    });
});

router.post('/edit_week/:id', (req, res) => {
    const id = req.params.id;
    const entries = [
        req.body.monday,
        req.body.tuesday,
        req.body.wednesday,
        req.body.thursday,
        req.body.friday,
        req.body.saturday,
        req.body.week_project,
        req.body.student_comment,
        req.body.week_number,
    ]
        const sql = `UPDATE logbook 
        set monday = ?, tuesday = ?, wednesday = ?, thursday = ?, friday = ?, saturday = ?, week_project = ?, student_comment = ?
        Where week_number = ? and student_id = ?;`
    con.query(sql, [...entries, id], (err, result) => {
        if(err) return res.json({Status: false, Error: err})
        return res.json({Status: true})
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


  export {router as StudentRouter}