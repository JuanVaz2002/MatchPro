// import mysql from 'mysql2';
// import config from './config';

// const params = {
//     user: config.mysql.user,
//     password: config.mysql.password,
//     host: config.mysql.host,
//     database: config.mysql.database
// };

// const Connect = async () =>
//     new Promise<mysql.Connection>((resolve, reject) => {
//         const connection = mysql.createConnection(params);

//         connection.connect((error) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             resolve(connection);
//         });
//     });

// const Query = async (connection: mysql.Connection, query: string) =>
//     new Promise((resolve, reject) => {
//         connection.query(query, connection, (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             resolve(result);
//         });
//     });

// export { Connect, Query };

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "arkusSQL#1234",
//     database: "matchprodb",
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
// });

// // pool.query("SELECT * FROM matchprodb.users", (err, results) => {
// //     if (err) {
// //         console.error(err);
// //     } else {
// //         console.log(results);
// //     }
// // });

// function getUsers(email, password) {
//     let command = `SELECT * FROM matchprodb.users where email='${email}' and password='${password}'`;
//     pool.query(command, (err, results) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(results);
//             console.log(results[0].id);
//         }
//     });
// }

// let email = "john@example.com";
// let password = "demo1234";

// getUsers(email, password);
