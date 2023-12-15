const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    roomNumber: [{
        number: Number, unavailableDates: [{ type: [Date] }]
    }],
    roomFor: {
        type: [String],
        required: true
    }

}, { timstamps: true })

module.exports = mongoose.model('room', roomSchema)