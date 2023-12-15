const User = require('../models/User');
const { createError } = require('../utility/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



exports.registerUser = async (req, res, next) => {

    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;




    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const userCheck = await User.findOne({ username: req.body.username });
        if (userCheck !== null) {
            return res.status(404).send("User is already Exists !");
        } else {
            const newUser = new User({
                username: username,
                password: hashPassword,
                email: email,
                mobile: mobile
            })
            await newUser.save()
            res.status(200).send("User Created Successfulluy...");
        }
    } catch (err) {
        next(createError(500, err.message));
    }

}
exports.loginUser = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userFind = await User.findOne({ username: username })
        console.log(userFind)
        if (userFind != null) {

            const hashPassword = await bcrypt.compare(password, userFind.password)

            if (hashPassword === true) {

                //  Jwt to genrate a jwt token
                const token = jwt.sign({ id: userFind._id, isAdmin: userFind.isAdmin }, process.env.JWT)

                //  Here we do our user data destructuring because we can't send password or admin details is user so that's why i do this 

                const { password, isAdmin, ...otherDetails } = userFind._doc;

                return res.cookie("access_token", token, {
                    httpOnly: true
                }).status(200).json({ ...otherDetails })


            } else {

                return res.status(500).send("Password Not Matched")
            }
        } else {
            return res.status(404).send("User Not Found ")
        }
    } catch (err) {
        next(createError(500, err.message))
    }
}