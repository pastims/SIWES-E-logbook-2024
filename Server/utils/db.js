import mysql from 'mysql'

const con = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_timttech",
    password: "uhc6@vdAdbX#*&k",
    database: "freedb_siwes-elogbook"
})

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "siwes-elogbook"
// })

con.connect(function(err) {
    if(err) {
        console.log("Conection Error")
    } else {
        console.log("Connected!")
    }
})

export default con;