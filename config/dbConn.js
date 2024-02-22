const mongoose = require('mongoose')
require('dotenv').config();
const connectDB = async() =>{
    let uri = process.env.DATABASE_URL
    try {
        await mongoose.connect(uri, 
            {
                dbName: 'veiculosDB',
                useUnifiedTopology: true, 
                useNewUrlParser: true});
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB