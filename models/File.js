const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

module.exports = File = mongoose.model('file', FileSchema);