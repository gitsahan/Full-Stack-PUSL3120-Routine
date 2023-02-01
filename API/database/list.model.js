const { mongoose } = require('mongoose');

const listschema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },

    _userId: {
        type: String,
        required: true,
    }
});

const list= mongoose.model("list", listschema);
module.exports = {list}