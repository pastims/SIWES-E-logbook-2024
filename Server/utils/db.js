import { Pool } from 'pg';

const con = new Pool({
    host: "dpg-cr9ugnaj1k6c73bm5tmg-a",
    user: "siwes_elogbook_user",
    password: "Bq0YonioWQr3u0VaqzRTNMgMGqYPcioe",
    port: 5432,
    database: "siwes_elogbook",
    ssl: {
        rejectUnauthorized: false
    }
});

// import mysql from 'mysql'

// const con = mysql.createConnection({
//     host: "sql.freedb.tech",
//     user: "freedb_timttech",
//     password: "uhc6@vdAdbX#*&k",
//     database: "freedb_siwes-elogbook"
// })

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "siwes-elogbook"
// })

con.connect(function(err) {
    if(err) {
        console.log("Conection Error", err.stack)
    } else {
        // console.log("Connected!")
        console.log("Connected to PostgreSQL!")
    }
})

export default con;