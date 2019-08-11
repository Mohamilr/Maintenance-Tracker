import jwt from 'jsonwebtoken';
import user from '../dummydata/dummyUser';


const authenticate = {
    signUp(req, res) {
        const id = user[user.length - 1].id;
        const {username, password} = req.body;

        user.push({
            id: id + 1,
            username,
            password
        })
        if(!username || !password){
            res.status(400).json({
                message: "username and password required"
            })
        }
        else{
            jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                res.status(200).json({
                    user,
                    token
                })
            })

        }
    },
    logIN(req, res) {
        const { username, password } = req.body;

        user.forEach(user => {
            if (username === user.username && password === user.password) {
                jwt.sign({ username, password }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
                    res.status(200).json({
                        token
                    });
                });
            }
            else {
                console.log('ERROR, could not get token');
            }
        })
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
