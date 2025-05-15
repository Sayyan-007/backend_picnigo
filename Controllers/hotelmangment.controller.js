const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const HotelMangmentData = require('../models/hotelmangment.model')



const signup = async (req, res) => {

    try {
        const { body } = req
        body.password = await bcrypt.hash(body.password, 10)
        const response = await HotelMangmentData.create(body)
        if (!response?._id) {
            return res.status(404).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({ sub: response }, process.env.HOTEL_JWT_KEY, { expiresIn: '7d' })
        return res.status(201).send({
            message: "Signup Successfully",
            HotelMangmentDatas: response,
            token
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }

}



const login = async (req, res) => {

    try {
        const { username, password } = req.query
        if (username == "") {
            return res.status(404).send({
                message: "username Required"
            })
        }
        if (password == "") {
            return res.status(404).send({
                message: "Password Required"
            })
        }
        const response = await HotelMangmentData.findOne({ username })

        if (!response) {
            return res.status(404).send({
                message: "username Doesn't match"
            })
        }
        if (response.isBlocked) 
        {
            return res.status(403).send({ 
                message: "User is blocked by admin" 
            }); 
        }
        const passwordValidation = await bcrypt.compare(password, response.password)
        if (!passwordValidation) {
            return res.status(404).send({
                message: "Password Doesn't match"
            })
        }
        response.password = null
        const token = jwt.sign({ sub: response }, process.env.HOTEL_JWT_KEY, { expiresIn: '7d' })
        return res.status(202).send({
            message: "Logged In",
            HotelMangmentDatas: response,
            token
        })
    }
    catch (err) {
        return res.status(500).send({
            message: "Internal Error Occured"
        })
    }

}

const Count = async(req,res) =>{
    try 
    {
        const response = await HotelMangmentData.find()
        if(!response)
        {
            return res.status(404).send({
                message:"No Users Available",
                count:0
            })
        }
        return res.status(200).send({
            messgae:"data fetched",
            displayedData:response,
            count:response.length
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
    }
}

module.exports={signup,login,Count}