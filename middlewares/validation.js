

const validateTodo = (req, res, next) => {
    const title  = req.body.title;
    if (!title) {
        next(" empty title")
    }
    next();
}
module.exports={
    validateTodo
}