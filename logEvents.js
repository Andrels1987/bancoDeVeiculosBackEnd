const dates = require("date-fns")
const {v4: uuid} = require("uuid")
const path = require("path")
const fsPromises = require('fs').promises;
const fs = require('fs');
const logEvents = async(message) =>{
    const dateTime = dates.format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
    const logItem = `${uuid()}\t${dateTime}\t${message}`;

    try {
        if(!fs.existsSync(path.join(__dirname, "logs"))){
            await fsPromises.mkdir(path.join(__dirname,"logs"));
        }
        await fsPromises.appendFile(path.join(__dirname,'logs','eventLogs.log'),`\n${logItem}`)
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = logEvents;