const mongoose = require('mongoose');
const { stringify } = require('querystring');
const todoSchema = new mongoose.Schema({
    userId: { type: Number, default: 0 },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    status: {
        type: String,
        default: "to-do"
    },
    tags: {
        type: [
            {
                type: String,
                maxlength: 10,
            },
        ],
    },
},
     {timestamps: true}
);

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo
