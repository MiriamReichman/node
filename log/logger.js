const { format } = require('express/lib/response');
const winston=require('winston');
require('winston-mongodb')

const logConfiguration ={
    transports:[
        new winston.transports.Console({
            level:'warn'
        }),
        new winston.transports.File({
            level:'error',
            filename:'log/logfile.log'
        }),
        new winston.transports.MongoDB({
            level:'error',
            db:'mongodb://srv1:27017/324283258_Miriam',
            options:{
                useUnifiedTopology:true
            },
            collection:'server_logs',
            format:winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],

 
  
format:winston.format.combine(
    winston.format.timestamp({
        format:'MMM-DD-YY HH:mm:ss'
    }),
    winston.format.printf(
        info=>`${info.level}:${[info.timestamp]}:${info.message}`
    ),
)
    }
const logger=winston.createLogger(logConfiguration);
module.exports=logger;