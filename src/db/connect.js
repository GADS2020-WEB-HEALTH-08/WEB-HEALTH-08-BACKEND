const mysql = require('mysql')
const dotenv = require('dotenv')

// console.log('here')
//
// let connection = mysql.createConnection({
//     host: process.env.LOCAL_CONNECTION_STRING,
//     user: 'root',
//     password: '',
//     database: 'web-health-backend-db'
// });
//
// connection.connect((err) => {
//     if (err){
//         return console.log(`Error ${err.message}`)
//     }
//     console.log('DB Connection Successful!')
// });
//
// connection.end((err) => {
//     if (err) {
//         return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
// });


const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('web-health-backend-db','root', '', {
    host: 'localhost',
    dialect: 'mysql',
})


const connect = async () =>  {
    try {
        await sequelize.authenticate();
    }catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    connect
}