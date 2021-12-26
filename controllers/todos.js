const Todo = require("../models/todo");

const create = (user) => Todo.create(user);
const find = (q) => Todo.find(q);
const delDoc = (id) => Todo.deleteOne({ _id: id }).exec();
const update = (id, body) => Todo.updateOne({ _id: id }, { $set: body });



module.exports = { create, find, delDoc, update };