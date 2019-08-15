import jwt from 'jsonwebtoken';

import pool from '../model/connect.database';


const authenticate = {
    async signUp(req, res) {
        const { username, password } = req.body;

        try {
            const checkUserQuery = `SELECT * FROM users WHERE username=$1`;
            const value = [username];
            const check = await pool.query(checkUserQuery, value);
            if (check.rows[0]) {
                res.status(400).json({
                    message: 'username already exist'
                })
            }
            else {
                const signupQuery = `INSERT INTO users (username, password)
                VALUES ($1, $2) RETURNING *`;
                const values = [username, password];
                const signed = await pool.query(signupQuery, values);
                res.status(200).json({
                    user: signed.rows[0]
                });
            }
        }
        catch (err) {
            console.log(err);
        }
        // if(!username || !password){
        //     res.status(400).json({
        //         message: "username and password required"
        //     })
        // }
        // else{
        //     jwt.sign({ user }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
        //         res.status(200).json({
        //             user,
        //             token
        //         })
        //     })

        // }
    },
    async logIN(req, res) {
        const { username, password } = req.body;

        try {
            const logInQuery = `SELECT * FROM users WHERE username=$1`;
            const value = [username];
            const user = await pool.query(logInQuery, value);
            if (process.env.ADMIN_USERNAME === username && process.env.ADMIN_PASSWORD === password) {
                res.status(200).json({
                    message: 'user loged in successfully'
                });
            }
            else if (user.rows[0].username === username && user.rows[0].password === password) {
                res.status(200).json({
                    message: 'user loged in successfully'
                });

            }
        }
        catch (err) {
            res.status(403).json({
                message: 'incorrect username and password'
            });
            console.log(err);
        }

        // user.forEach(user => {
        //     if (username === user.username && password === user.password) {
        //         jwt.sign({ username, password }, process.env.SECRETKEY, { expiresIn: '1h' }, (err, token) => {
        //             res.status(200).json({
        //                 token
        //             });
        //         });
        //     }
        //     else {
        //         console.log('ERROR, could not get token');
        //     }
        // })
    },
    verify(req, res, next) {
        const header = req.headers['authorization'];

        if (typeof header !== 'undefined') {
            const bearerHeader = header.split(' ');
            const token = bearerHeader[1];

            req.token = token

            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}


export default authenticate;
