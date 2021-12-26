const jwt = require ('jsonwebtoken')
const User= require('../models/users')
const auth = (req, res, next )=> {
    const {authorization} = req.headers
    const payload = jwt.verify(authorization,'jkfkjjhfkdghfdkghdfkgnhl' ) 
    const user= User.findOne({username: payload.username})
    .then(user =>{
        req.user= user;
        next ()
    })
    console.log(payload)

}
module.exports= auth;