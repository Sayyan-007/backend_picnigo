const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Camporganization = require('../models/camporganization.model')



const signup = async (req, res) => {

    try {
        const { body } = req
        body.password = await bcrypt.hash(body.password, 10)
        const response = await Camporganization.create(body)
        if (!response?._id) {
            return res.status(404).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({ sub: response }, process.env.CAMP_JWT_KEY, { expiresIn: '7d' })
        return res.status(201).send({
            message: "Signup Successfully",
            Camporganizations: response,
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
        if (!username) {
            return res.status(404).send({
                message: "Agency Name Required"
            })
        }
        if (!password) {
            return res.status(404).send({
                message: "Password Required"
            })
        }
        const response = await Camporganization.findOne({ username })

        if (!response) {
            return res.status(404).send({
                message: "Agency Name Doesn't match"
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
        const token = jwt.sign({ sub: response }, process.env.CAMP_JWT_KEY, { expiresIn: '7d' })
        return res.status(202).send({
            message: "Logged In",
            Camporganizations: response,
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
        const response = await Camporganization.find()
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


module.exports={login,signup,Count}