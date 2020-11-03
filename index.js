const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const router =  require('./src/routes/routes');

const app = express();
const port = process.env.PORT || 4000;

const connectToDatabase = require('./src/db/mongoose');

dotenv.config();
connectToDatabase();


// const sequelize = require('./src/db/connect')
// sequelize.connect().then((r) => {
//     console.log('connection successful')
// });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', router);


app.listen(port, () =>{
    console.log(`App running on ${port}`)
})
