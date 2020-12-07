  
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    Username: String,
    Email: String,
    Balance: Number
});

var userModel = mongoose.model('User', userSchema);


const arr = [{Username: "Rahul Sharma", Email: "rahul@gmail.com",Balance:100000},
{Username: "Aman Singh", Email: "aman@gmail.com",Balance:100000},
{Username: "Rohan Gaur", Email: "rohan@gmail.com",Balance:100000},
{Username: "Srishti Dalal", Email: "srishti@gmail.com",Balance:100000},
{Username: "Khushi Narain", Email: "khushi@gmail.com",Balance:100000},
{Username: "Tanvi Tripathi", Email: "tanvi@gmail.com",Balance:100000},
{Username: "Devansh Gupta", Email: "devansh@gmail.com",Balance:100000},
{Username: "Rashmi Goel", Email: "rashmi@gmail.com",Balance:100000},
{Username: "Vinay Saini", Email: "vinay@gmail.com",Balance:100000},
{Username: "Apurva Chand", Email: "apurva@gmail.com",Balance:100000}]

userModel.remove(arr,(error,docs) => {
    if (error) return {error}
    else{
        return {docs}
    }
} )

module.exports  = userModel;