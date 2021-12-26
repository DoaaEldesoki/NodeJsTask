const User = require("../models/users");
const bcrybt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const create = (user) => User.create(user);
const find = (q) => User.find(q, { firstName: 1, _id: 0 });
const delDoc = (_id) => User.deleteOne({ _id: id }).exec();
const update = (id, body) => User.updateOne({ _id: id }, body);

const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).exec(); // to get hash from it 
    const isValid = await user.comparePassword(password);
    if (!isValid){
        throw new Error ('UN_AUTH')
    }
//   const {SECRET}= process.env
  const token=  jwt.sign({
        username, _id: user.id,
        maxAge : '1d' ,
    }, "jkfkjjhfkdghfdkghdfkgnhl")
    return token;

    console.log(isValid);
}


module.exports = { create, find, delDoc, update, login };