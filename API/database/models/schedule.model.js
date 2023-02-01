const { mongoose } = require("mongoose");

const schedulechema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    _listId: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        default: false,
    }
})

const schedules = mongoose.model("schedules", schedulechema);
module.exports = {schedules}