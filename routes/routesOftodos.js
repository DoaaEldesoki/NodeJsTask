const express = require('express');
const {validateTodo}= require("../middlewares/validation")
const Todo= require('../models/todo')
const router = express.Router()
const {create, find,delDoc, update}= require("../controllers/todos")


router.get('/',async (req,res) => {
    const todos = await Todo.find()
    res.json(todos);
    })

    router.get('/:id',async (req, res, next) => {
        const { id } = req.params;
        const document = Todo.findById(id)
        .then(data => res.json(data))
        .catch(err => next("Can't get this ID") )
    
    })
    router.get('/:userId', async (req, res, next )=> {
       const userId=  req.params.userId;
       const doc = Todo.findById(userId)
        .then(data => res.json(data))
        .catch(err => next("Can't get this ID") )
    })

router.get('todos?limit=10&skip=0', async (req,res,next)=>{
    const todo = req.body;
    const doc = Todo.findOne(todo).limit(10).skip(0)
    .then(data => res.json(data))
    .catch(err => next("Can't get this") )
})

    router.post('/',validateTodo, async (req,res,next)=>{
        const todo = req.body;
        try {
            const doc = await Todo.create(todo);
            res.json(doc);
        } catch(err) {
            next(err)
        }
        

    })
    router.patch('/:id', async (req,res,next)=>{
        const id= req.params.id;
        const body= req.body;
        const title = req.params.title;
        const status = req.params.status;
        const tags = req.params.tags
        // update(id,body)
        // .then((doc)=> res.json({ message: "user was edited ", user : body}))
        // .catch((e)=> next(e));
        const updateDoc = ToDo.findByIdAndUpdate(id,{ title:title , status:status , tags:tags}).exec()
    .then (data => res.json(`Todo was edited successfully”`)) 
    .catch(err => next("Id not found") )
    })        



    router.delete('/:id', async (req,res)=>{
        const id= req.params.id;
        delDoc(id)
        .then((doc)=> res.json(doc))
        .catch((e)=> next (e));
     })

module.exports= router;