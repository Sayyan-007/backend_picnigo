const {connect, default: mongoose}=require('mongoose')
require('dotenv').config()

const database=async()=>{
    try 
    {
        const {connection} = await connect(process.env.DB_LINK,{dbName:"Final_Projects"})
        console.log('databased is connected',connection.db.databaseName);
    } 
    catch(error) 
    {
        console.log(error);
        
    }
}

module.exports = {database}