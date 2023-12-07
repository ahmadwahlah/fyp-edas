const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next){
    //Get token form header 
    const token = req.header("x-auth-token");
    // if token doesnot exist
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    // if token exists
    try {
        const decoded = jwt.verify(token, config.get('jwtsecret'));
        if(decoded.student){
            req.student = decoded.student;
        }else if(decoded.admin){
            req.admin = decoded.admin;
        }else if(decoded.faculty){
            req.faculty = decoded.faculty;
        }
        next();
    } catch (error) {   
        res.status(401).json({msg: 'Token is not valid'});
    }   
}