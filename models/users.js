const mongoose = require('mongoose');
const bcrybt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');
// const {options} = require('../routes/routesOfusers');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true } ,
        minlength: 8,
    },
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
    },
    lastName: {
        type: String,
        minlength: [3, "first name should be at least  3 letters."],
        maxlength: [15, "first name can't exceed 15 letters"],
    },
    password: {
        type: String,
        required: true,

    },userid:{
        type:Number,
    }
},
    {
        toJSON: { // it is property in JS Object,  we use this function to prevent return the password to the user., i can control the shape of the returned data.
            transform: (doc, ret, options) => {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        }
    },
    { timestamps: true }
);
userSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'userid'});
  var ItemModel = mongoose.model('Item', userSchema);
//   let newItem1= new ItemModel({
//     text:'text1',
//     key:'key1',
//     status:'A'
//   });
//   newItem1.save();

userSchema.pre('save', async function (next) { // it is a mongoose middleware , we can hash the password, and override on it. 
    const hash = await bcrybt.hashSync(this.password, 8)
    this.password = hash;
    next()

});
//after that we need to compare the enserted password and the hash password which saved in database , we will add this in route
userSchema.methods.comparePassword = function(password){
    const isValid= bcrypt.compareSync(password, this.password);
    return isValid
}
const User = mongoose.model('User', userSchema)
module.exports = User;