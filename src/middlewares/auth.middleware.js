
const jwt = require('jsonwebtoken');

function veryfyToken(role = 'user') {
    return (req, res, next) => {

        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            console.log("No header");
            return res.sendStatus(401);
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            console.log("No access token");
            return res.sendStatus(401);
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
            req.id = decoded.id;
            req.username = decoded.username;
            req.role = decoded.role;
            if (role === 'admin' && req.role !== 'admin') {
                return res.sendStatus(403);
            } else if (role === 'staff' && req.role === 'user') {
                return res.sendStatus(403);
            }
            next();
        } catch (error) {
            return res.sendStatus(403);
        }
    }
}

module.exports = { veryfyToken };