require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserData = require('../models/user.model')
const travelpackages = require('../models/touristPackages.model')
const hotelpackages = require(`../models/hotelPackage.model`) 
const camppackages =  require(`../models/camppackage.model`)


const signup = async(req,res) =>{

    try
    {
        const {body} = req
        body.password = await bcrypt.hash(body.password,10)
        const response  = await UserData.create(body)
        if(!response?._id)
        {
            return res.status(404).send({
                message:"Bad Request"
            })
        }
        response.password=null
        const token=jwt.sign({sub:response},process.env.USER_JWT_KEY,{expiresIn:'7d'})
        return res.status(201).send({
            message:"Signup Successfully",
            UserDatas:response,
            token
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }

}

const login =async(req,res) =>{

    try
    {
        const {username,password} = req.query
        if(username == "")
        {
            return res.status(404).send({
                message: "Username Required"
            })
        }
        if(password == "")
        {
            return res.status(404).send({
                message: "Password Required"
            })
        }
        const user = await UserData.findOne({username})
 
        if(!user)
        {
            return res.status(404).send({
                message:"Username Doesn't match"
            })
        }

        if (user.isBlocked) 
        {
            return res.status(403).send({ 
                message: "User is blocked by admin" 
            });
        }

        const passwordValidation = await bcrypt.compare(password,user.password)
        if(!passwordValidation)
        {
            return res.status(404).send({
                message:"Password Doesn't match"
            })
        }
        user.password = null
        const token = jwt.sign({sub:user},process.env.USER_JWT_KEY,{expiresIn:'7d'})
        return res.status(202).send({
            message:"Logged In",
            UserDatas:user,
            token
        })
    }
    catch(err)
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
    }
}




const traveldisplay = async(req,res) => {


    try 
    {
        const response =await travelpackages.find()
        if(!response)
        {
            return res.status(404).send({
                message:"No Packages Available"
            })
        }
        return res.status(200).send({
            messgae:"data fetched",
            displayedData:response
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
        
    }

}
const hoteldisplay = async(req,res) => {


    try 
    {
        const response =await hotelpackages.find()
        if(!response)
        {
            return res.status(404).send({
                message:"No Packages Available"
            })
        }
        return res.status(200).send({
            messgae:"data fetched",
            displayedData:response
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
        
    }

}
const campdisplay = async(req,res) => {


    try 
    {
        const response =await camppackages.find()
        if(!response)
        {
            return res.status(404).send({
                message:"No Packages Available"
            })
        }
        return res.status(200).send({
            messgae:"data fetched",
            displayedData:response
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
        
    }

}



module.exports={signup,login,traveldisplay,hoteldisplay,campdisplay}