const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const AgencyData = require('../models/agency.model')

const signup = async (req, res) => {

    try {
        const { body } = req
        body.password = await bcrypt.hash(body.password, 10)
        const response = await AgencyData.create(body)
        if (!response?._id) {
            return res.status(404).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({ sub: response }, process.env.AGENCY_JWT_KEY, { expiresIn: '7d' })
        return res.status(201).send({
            message: "Signup Successfully",
            AgencyDatas: response,
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
        const { Agency_Name, password } = req.query
        if (Agency_Name == "") {
            return res.status(404).send({
                message: "Agency Name Required"
            })
        }
        if (password == "") {
            return res.status(404).send({
                message: "Password Required"
            })
        }
        const agency = await AgencyData.findOne({ Agency_Name })

        if (!agency) {
            return res.status(404).send({
                message: "Agency Name Doesn't match"
            })
        }
        if (agency.isBlocked) 
            {
                return res.status(403).send({ 
                    message: "User is blocked by admin" 
                });
            }
        const passwordValidation = await bcrypt.compare(password, agency.password)
        if (!passwordValidation) {
            return res.status(404).send({
                message: "Password Doesn't match"
            })
        }
        agency.password = null
        const token = jwt.sign({ sub: agency }, process.env.AGENCY_JWT_KEY, { expiresIn: '7d' })
        return res.status(202).send({
            message: "Logged In",
            AgencyDatas: agency,
            token
        })
    }
    catch (err) {
        return res.status(500).send({
            message: "Internal Error Occured"
        })
    }

}


const update = async (req, res) => {
    try {
        const { Agency_Name, email } = req.body
        const { id } = req.query
        if (email === "") {
            return res.status(404).send({
                message: "Email Required"
            })
        }
        const response = await AgencyData.updateOne({ _id: id }, {$set:{ Agency_Name, email }})
        if (response.modifiedCount > 0) {
            return res.status(200).send({
                message: "Updated",
                AgencyDatas: response
            })
        }
        return res.status(404).send({
            message: "invalid ID Required"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const Count = async(req,res) =>{
    try 
    {
        const response = await AgencyData.find()
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

module.exports = { signup, login, update,Count}