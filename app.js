//const db= require('./DB/db')
const db= require('./DB/mongoose')
const user=require('./Router/User');
const product=require('./Router/Product')
const category=require('./Router/Category')
const order=require('./Router/Order')
const express=require('express')
const path=require('path')
const app=express();

const logger=require('./log/logger');

 const dotenv= require('dotenv');
dotenv.config();
const port=process.env.PORT;
 //const port=3000;

app.use(express.static('static'))
db.connect()
app.use(express.json());

app.use('/api/user',user);

app.use('/api/product',product);
app.use('/api/category',category);
app.use('/api/order',order)
if(process.env.ENVIERMENT=="development"){
app.use((err,req,res,next)=>{
    logger.error(err.message);
    res.status(500).send('Error Happend');
})}
app.use((req,res)=>{


    res.status(404)
    res.sendfile(path.join(__dirname,'./static/PageNotFund.html'));
})
app.listen(port,()=>{
    console.log("hellow server!")
})