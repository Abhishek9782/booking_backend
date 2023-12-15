const { createError } = require('../utility/error')
const users = require('../models/User')

exports.updateUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const updatedUser = await users.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        return res.status(200).json(updatedUser)
    } catch (err) {
        return next(createError(500, err))
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const deleteUser = await users.findByIdAndDelete(id)
        return res.status(200).json({ message: "User SuccessFully Deleted ..." })
    } catch (err) {
        return next(createError(500, err))
    }
}


exports.getUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const user = await users.findById(id)
        return res.status(200).json(user)
    } catch (err) {
        return next(createError(500, err))
    }
}

exports.getAllUser = async (req, res, next) => {
    try {
        const allUser = await users.find()
        return res.status(200).json(allUser)
    } catch (err) {
        return next(createError(400, err))
    }
}

