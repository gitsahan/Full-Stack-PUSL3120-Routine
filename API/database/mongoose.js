const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Routine', {useNewUrlParser: true}).then(()=>{
    console.log("Successfully connected to MongoDB");
}).catch((e)=>{
    console.log("Connection to MongoDB was unsuccessful.")
    close.log(e);
});

mongoose.set('strictQuery', );

module.exports={
    mongoose
};