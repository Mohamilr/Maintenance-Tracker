import pg from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const connectToDatabase = {
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const pool = new pg.Pool(connectToDatabase);

pool.on('connect', () => {});

//user table
const createTable = async () => {
  
    const tableQuery = `CREATE TABLE IF NOT EXISTS 
    users(
        userId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        username VARCHAR(200) NOT NULL,
        password VARCHAR(250) NOT NULL
    )`;

    try{
        await pool.query(tableQuery);
        console.log('users table created')
    } catch(error){
       console.log(error)
    }
};

//request table
const createRequestTable = async () => {
    
    const requestTableQuery = `CREATE TABLE IF NOT EXISTS
    requests(
        requestId SERIAL PRIMARY KEY NOT NULL UNIQUE,
        faultyItem VARCHAR(100) NOT NULL,
        itemType VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        complaint VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL,  
        userId INT NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE ON UPDATE CASCADE
    )`;

    try{
        await pool.query(requestTableQuery);
        console.log('request table created');
    }
    catch(err){
        console.log(err);
    }
}

// drop table
// const dropTable = async () => {
//     const query = `DROP TABLE IF EXISTS admin`;
//     try{
//         await pool.query(query);
//         console.log('user table dropped');
//     }
//     catch(error){
//         console.log(error);
//     }
// };



//first table
createTable();

//second table
createRequestTable();

//drop table
// dropTable();


export default pool;