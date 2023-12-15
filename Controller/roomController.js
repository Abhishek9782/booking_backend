const Room = require('../models/Room');
const { createError } = require('../utility/error');
const Hotel = require('../models/hotelSchema')

//  Here we do two 
exports.createRoom = async (req, res, next) => {
    const hotelid = req.params.hotelId;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelid, {
                $push: { rooms: savedRoom._id }
            });
            res.status(200).json({ message: "successfully addd...." })
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }

}
exports.updateRoom = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)

    } catch (err) {
        next(createError(500, "Room Can't Update "))
    }
}

exports.updateavailibilty = async (req, res, next) => {
    try {
        const update = await Room.updateOne(
            {
                "roomNumber._id": req.params.roomId
            }, {
            $push: {
                "roomNumber.$.unavailableDates": req.body.dates
            }
        }
        )
        return res.status(200).json("Room status is updated  ....")
    } catch (err) {
        return next(err)

    }

}

exports.deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })
            res.status(200).json({ message: "SuccessFully Deleted Room..." })
        } catch (err) {

        }

    } catch (err) {
        next(createError(500, "Room Can't Delete "))
    }
}
exports.getRoom = async (req, res, next) => {
    const id = req.params.id;
    try {
        const getRoom = await Room.findById(id)
        res.status(200).json(getRoom)
    } catch (err) {
        next(createError(500, "Some issue "))
    }
}

exports.getallRoom = async (req, res, next) => {
    try {
        const getallRoom = await Room.find()
        res.status(200).json(getallRoom)

    } catch (err) {
        next(createError(500, "Some issue "))
    }
}




