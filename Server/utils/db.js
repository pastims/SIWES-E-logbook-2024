// import { Pool } from 'pg';

// const con = new Pool({
//     host: "dpg-cr9ugnaj1k6c73bm5tmg-a",
//     user: "siwes_elogbook_user",
//     password: "Bq0YonioWQr3u0VaqzRTNMgMGqYPcioe",
//     port: 5432,
//     database: "siwes_elogbook",
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

import mysql from 'mysql'

// const con = mysql.createConnection({
//     host: "sql.freedb.tech",
//     user: "freedb_timttech",
//     password: "uhc6@vdAdbX#*&k",
//     database: "freedb_siwes-elogbook"
// })

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "siwes-elogbook"
})

con.connect(function(err) {
    if(err) {
        console.log("Conection Error", err.stack)
    } else {
        // console.log("Connected!")
        console.log("Connected to Database")
    }
})

export default con;



//===================================

// import mysql from 'mysql2/promise';

// const con = mysql.createPool({
//     host: process.env.DB_HOST, 
//     user: process.env.DB_USERNAME, 
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// const testConnection = async () => {
//     try {
//         const connection = await con.getConnection();
//         console.log('Connected successfully');
//         connection.release(); // Release the connection back to the con
//     } catch (err) {
//         console.error('Error connecting to the database:', err.message);
//     }
// };

// testConnection();

// export default con;



//========================================
//finally worked


// import mysql from 'mysql2';

// // Create a con with callback API
// const con = mysql.createPool({
//     host: process.env.DB_HOST, 
//     user: process.env.DB_USERNAME, 
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // Export the con
// export default con;