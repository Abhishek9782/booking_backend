const hotels = require('../models/hotelSchema');
const Room = require('../models/Room');
const { createError } = require('../utility/error')


exports.createHotel = async (req, res) => {
    const newHotel = new hotels(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(201).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateHotel = async (req, res) => {
    const id = req.params.id
    try {
        const updateHotel = await hotels.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(201).json(updateHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteHotels = async (req, res) => {
    const id = req.params.id
    try {
        const deleteHotel = await hotels.findByIdAndDelete(id)
        res.status(200).json({ message: "Hotel Delete SuccessFully...." })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getHotel = async (req, res, next) => {
    const id = req.params.id
    try {
        const getHotel = await hotels.findById(id)
        res.status(200).json(getHotel)
    } catch (err) {
        next(createError(500, "Please Enter Right user Id"))
    }
}

exports.getAllHotels = async (req, res) => {
    const { min, max, limit, ...others } = req.query;
    // console.log(req.url)
    try {
        const allHotel = await hotels.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 9999 }
        }).sort({ cheapestPrice: 1 }).limit(req.query.limit)
        console.log(allHotel)

        //  Cheapes Price error Please Solve it 

        res.status(200).json(allHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.cityhotelCount = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map((city) => {
            return hotels.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }


}


exports.countbyType = async (req, res, next) => {
    try {
        const countHotel = await hotels.countDocuments({ type: "Hotel" });
        const countVilla = await hotels.countDocuments({ type: "Villa" });
        const countapartments = await hotels.countDocuments({ type: "apartments" });
        const countresorts = await hotels.countDocuments({ type: "resorts" });
        const countcabins = await hotels.countDocuments({ type: "cabins" });

        res.status(200).json([
            { type: "Hotel", count: countHotel },
            { type: "Villa", count: countVilla },
            { type: "apartments", count: countapartments },
            { type: "restorts", count: countresorts },
            { type: "Cabins", count: countcabins },

        ])


    } catch (err) {
        next(err)
    }

}

exports.getRoomById = async (req, res, next) => {
    try {
        const findHotel = await hotels.findById(req.params.id)
        const list = await Promise.all(findHotel.rooms.map((room) => {
            return Room.findById(room)
        }))

        res.status(200).json(list)

    } catch (err) {
        next(err);
    }

}

