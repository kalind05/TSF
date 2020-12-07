const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var historySchema = new Schema({
    Creditor: String,
    Recipient: String,
    Amount: Number

})

historyModel = mongoose.model("History", historySchema);

module.exports = historyModel;