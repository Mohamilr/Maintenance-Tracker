import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import pool from '../model/connect.database';

const authenticate = {
    // sign up a new user
    async signUp(req, res) {
        const { username, password } = req.body;

        try {
            // query to check if user already exit
            const checkUserQuery = `SELECT * FROM users WHERE username=$1`;
            const value = [username];
            const check = await pool.query(checkUserQuery, value);

            // message if username or password is not received from the body
            if (!username || !password) {
                return res.status(400).json({
                    message: "username and password required"
                })
            }

            // bcrypt hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);


            //if a username exists
            if (check.rows[0]) {
                res.status(400).json({
                    message: 'username already exist'
                })
            }
            // admin signup
            else if (process.env.ADMIN_USERNAME === username && process.env.ADMIN_PASSWORD === password) {
                const signupQuery = `INSERT INTO users (username, password)
                VALUES ($1, $2) RETURNING *`;
                const values = [username, hashedPassword];
                const adminResult = await pool.query(signupQuery, values);

                // generate admin token
                jwt.sign({ username, password }, process.env.ADMIN_SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                    res.status(200).json({
                        message: 'admin signed up successfully',
                        token,
                        user: adminResult.rows[0]
                    });
                });
            }
            // users signup
            else {
                const signupQuery = `INSERT INTO users (username, password)
                VALUES ($1, $2) RETURNING *`;
                const values = [username, hashedPassword];
                const signed = await pool.query(signupQuery, values);


                // generate token
                jwt.sign({ username, password }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                    return res.status(200).json({
                        message: 'user signed up successfully',
                        token,
                        user: signed.rows[0],
                        username: signed.rows[0].username
                    });
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    // login an exixting user
    async logIN(req, res) {
        const { username, password } = req.body;

        try {
            // query to check if username(from body) is present
            const logInQuery = `SELECT * FROM users WHERE username=$1`;
            const value = [username];
            const user = await pool.query(logInQuery, value);

            // if username is not present in the database
            if (!user.rows.length) {
                res.status(404).json({ message: 'incorrect username. please try again or signup if you haven\'t' });
            }

            // compare hashedpasword before login
            const isMatch = await bcrypt.compare(password, user.rows[0].password)
            

            // admin login
            if (user.rows[0].username === process.env.ADMIN_USERNAME && isMatch) {
                jwt.sign({ username, password }, process.env.ADMIN_SECRETKEY, { expiresIn: '1h' }, (err, token) => {
                    res.status(200).json({
                        message: 'admin loged in successfully',
                        token,
                        user: user.rows[0].userid
                    });
                });
            }
            // users login 
            else if (isMatch) {
                jwt.sign({ username, password }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
                    res.status(200).json({
                        message: 'user loged in successfully',
                        token,
                        userId: user.rows[0].userid,
                        username: user.rows[0].username
                    });
                });
            }
            else {
                res.status(403).json({
                    message: 'incorrect username or password'
                });
                console.log('ERROR, could not get token');
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    // verify generated token
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

// export authenticate to sign.route.js
// export verify function to user and admin route
export default authenticate;
