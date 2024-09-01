import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "siwes-elogbook"
})

con.connect(function(err) {
    if(err) {
        console.log("Conection Error")
    } else {
        console.log("Connected!")
    }
})

export default con;