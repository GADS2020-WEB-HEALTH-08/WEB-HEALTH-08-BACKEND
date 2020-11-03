const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();
const connectToDatabase = () => {
    mongoose.connect(process.env.ATLAS_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.log(err.message)
    });

    mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
};
//,
//
module.exports= connectToDatabase;
