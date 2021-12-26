const express = require('express');
const User = require('../models/users');
const { create, find, delDoc, update, login } = require("../controllers/users");
const bcrypt = require('bcryptjs')
const {hash }= require('bcryptjs')
const { route }= require('./routesOftodos')
const router = express.Router();

router.get('/', async (req, res, next) => {
    const users = await User.find().select('firstName');
    res.json(users);
})

router.post('/', async (req, res, next) => {
    const user = req.body;
    try {
        const doc = await User.create(user);
        res.json(doc);
    } catch (err) {
        next(err.message)
    }
})
//this 'login' to compare saved password and inserted password 
router.post('/login', async (req, res, next) => {
    const { username , password } = req.body;
    const user = await User.findOne({ username : req.body.username }).exec(); // to get hash from it 
    const token =  await login ({username, password});
    res.json({token})
})



router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    update(id, body)
        .then((doc) => res.json({ message: "user was edited ", user: body }))
        .catch((e) => next(e));
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    delDoc(id)
        .then((doc) => res.json(doc))
        .catch((e) => next("ID is not found"));
})
module.exports = router



























