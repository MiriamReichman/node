const mongoose = require('mongoose');
// const server = "mongodb://localhost:27017";
const dotenv= require('dotenv');
dotenv.config();
const connection=process.env.CONNECTION;
// const server = "mongodb://srv1:27017";
// const database = "324283258_Miriam";//
class Mongoose {
    constructor() {
        this.connect();
    }
    async connect() {
        await mongoose.connect(`${connection}`).then(() => {
            console.log(`mongoose connected secsessfuly`)
        }).catch((error) => { console.log(`error in mongoose connection: ${error}`) })
    }
}
module.exports = new Mongoose();