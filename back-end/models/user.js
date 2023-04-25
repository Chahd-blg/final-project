const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    adress: String,
    password: String,
    tel: { type: Number},
    avatar: String,
    gender:String,
    birthday:String,
    cv: String,
    role: String,
    status: String,
});


//creat user model
const user = mongoose.model("User",userSchema);
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

//make user exportable
module.exports=user;