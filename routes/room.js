const router = require('express').Router();
const roomController = require('../Controller/roomController');

// Create Room
router.post("/:hotelId", roomController.createRoom)
//  Update Room
router.put("/:id", roomController.updateRoom)
//  Update Availibilty 
router.put("/availability/:roomId", roomController.updateavailibilty);
// Delete Room
router.delete("/:id/:hotelId", roomController.deleteRoom)
//  Get Room 
router.get("/:id", roomController.getRoom)
//  Get All Room
router.get("/", roomController.getallRoom)




module.exports = router;