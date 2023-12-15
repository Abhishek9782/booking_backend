const express = require('express');
require('dotenv').config()
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');


//  Db Connection 
const mongoose = require('mongoose')

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connected with database')
    } catch (err) {
        throw err;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log('database disconnected')
})
mongoose.connection.on("connected", () => {
    console.log('database connected')
})

//middleware use ---------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('Pubic'))
app.use(cors())

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/room');
const userRoute = require('./routes/user');


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/hotels', hotelsRoute);



//  Error handler best middleware

app.use((err, req, res, next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || "Something Went Wrong"
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack

    })

})

app.listen(8080, () => {
    connect()
    console.log("server is listining on port 8080")
})