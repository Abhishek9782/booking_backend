const router = require('express').Router();
const { createError } = require('../utility/error')
const hotelController = require('../Controller/hotelsController')

// CREATE
router.post('/', hotelController.createHotel);
// UPDATE
router.put('/update/:id', hotelController.updateHotel);
// DELETE
router.delete('/delete/:id', hotelController.deleteHotels);
// GET
router.get('/hotelserch/:id', hotelController.getHotel);
// GET ALL
router.get('/', hotelController.getAllHotels);
//  CountBycity
router.get('/currentCityhotel/count', hotelController.cityhotelCount);
// Count By Type
router.get('/currentCityhotel/countbyType', hotelController.countbyType);
//  get Room By id 
router.get('/room/:id', hotelController.getRoomById);





module.exports = router;