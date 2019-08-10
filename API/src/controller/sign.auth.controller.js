import jwt from 'jsonwebtoken';
import user from '../dummydata/dummyUser';


const authenticate = {
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
