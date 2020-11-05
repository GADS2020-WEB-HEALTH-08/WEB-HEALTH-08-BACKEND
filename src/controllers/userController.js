const env = require('dotenv');
const userModel = require('../models/user');
const jwtUtil = require('../security/jwtAuth')
const bcrypt = require('bcrypt')

env.config();


const user = {

    register: async (req, res) => {
        const {username, email, password} = req.body

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword
        })

        newUser.save().then((user) => {
            res.json({user})
        }).catch((err) => {
            res.status(400).json({message: err})
        })
    },

    login: async (req, res) => {
        const {username, password} = req.body
        const token = jwtUtil.createToken(username);


        await userModel.findOne({username}).then((user) => {

            if (!user) {
                return res.status(400).json({
                    status: 404,
                    message: "User not found",
                    data: null
                })
            }



            if (bcrypt.compare(password, user.password)) {
                const token = jwtUtil.createToken(user);
                return res.json({
                    status: 200,
                    message: 'Success, Login Success created successfully',
                    data: {username: user.username, token}
                })
            }else {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: {
                        username,
                        token
                    }
                })
            }
        }).catch((err) => {
            return res.status(400).json({
                status: 500,
                message: err,
                data: null
            })
        })
    }

}

module.exports = user