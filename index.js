const express = require('express');
const mongoose = require('mongoose')
const todoRoutes = require('./routes/routesOftodos');
const userRoutes = require('./routes/routesOfusers')
const authmiddleware= require ('./middlewares/auth')
const app = express();



mongoose.connect('mongodb://localhost:27017/task3');

app.use(express.json());

app.use('/users', userRoutes);
app.use(authmiddleware)
app.use('/todos', todoRoutes);



app.use('*', (req, res, next) => {
    res.status(404)
})

app.use((err, req, res, next) => {
    res.status(500).json({ err });

})



app.listen(3000, () => {
    console.log('App is running on port:3000')
})