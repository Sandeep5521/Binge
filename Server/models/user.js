const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
// mongoose.connect("mongodb://localhost:27017/mdb") //{ useNewUrlParser: true, useUnifiedTopology: true}
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true
    },
    userEmail:{
      type: String,
      required: true,
      lowercase: true
    },
    password:{
      type: String,
      required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Users = new mongoose.model("Users", userSchema);
module.exports = Users;
