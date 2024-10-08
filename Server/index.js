import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import { StudentRouter } from "./Routes/StudentRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { SchoolSupervisorRouter } from "./Routes/SchoolSupervisorRoute.js";
import { IndustrySupervisorRouter } from "./Routes/IndustrySupervisorRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors({
    // origin: ["http://localhost:5173"],
    origin: ["https://siwes-e-logbook-2024.vercel.app"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)
app.use('/student', StudentRouter)
app.use('/school_supervisor', SchoolSupervisorRouter)
app.use('/industry_supervisor', IndustrySupervisorRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Status: false, message: 'No token provided'})
    }
    if(token) {
        Jwt.verify(token, "4781SIWES9912sjad34&*@", (err, decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify', verifyUser, (req, res)=> {
        return res.json({Status: true, role: req.role, id: req.id})
} )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})