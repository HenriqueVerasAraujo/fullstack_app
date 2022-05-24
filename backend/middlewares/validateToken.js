const { verify } = require('jsonwebtoken'); 

const validateToken = async (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        return res.json({error: "usuário não está logado"});
    }

    try {
        const validToken = verify(token, 'secretkey');
        if (validToken) {
            req.user = { 
                userName: validToken.userName,
                id: validToken.id,
            };
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }
} 

module.exports = {
    validateToken
};