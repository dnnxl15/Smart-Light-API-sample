const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next)
{
    const token = req.header('x-auth-token');
    if(!token) res.status(401).send('Access denied. No token provided');

    jwt.verify(token, "MySecurePassword");//config.get('jwtPrivateKey'));

    try
    {
        const decoded = jwt.verify(token, "MySecurePassword");//config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    }
    catch(ex)
    {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;