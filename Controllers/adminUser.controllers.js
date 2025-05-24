const UserData=require('../models/user.model')
const BookNowTourist = require("../models/booknowagency.model");
const AdminData = require('../models/admin.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


    // USER CONTROLLERS


const userdata=async(re1,res)=>{
    try 
    {
        const response = await UserData.find()
        const bookings = await BookNowTourist.aggregate([{$group:{_id:"$user_id",username: { $first: "$user_name" },totalbookings:{$sum:1},totalProfit:{$sum:"$package_amount"}}}])
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
            count:response.length,
            bookingsbyUser:bookings
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
    }
}


const userupdate = async (req, res) => {
    try {
        const { id } = req.query;
        const { isBlocked } = req.body;

        const response = await UserData.findOneAndUpdate({ _id: id }, { $set: { isBlocked } },  { new: true });

        if (response) {
            return res.status(200).send({
                message: "Package Updated",
                updatedPackage: response
            });
        }

        return res.status(400).send({
            message: "Package Not Found or Not Updated"
        });
    }

    catch (err) 
    {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Server Error"
        });
    }
}

const adminsignup = async(req,res) =>{

    try
    {
        const {body} = req
        body.password = await bcrypt.hash(body.password,10)
        const response  = await AdminData.create(body)
        if(!response?._id)
        {
            return res.status(404).send({
                message:"Bad Request"
            })
        }
        response.password=null
        const token=jwt.sign({sub:response},process.env.ADMIN_JWT_KEY,{expiresIn:'7d'})
        return res.status(201).send({
            message:"Signup Successfully",
            Admindata:response,
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

const adminlogin =async(req,res) =>{

    try
    {
        const {adminname,password} = req.query
        if(adminname == "")
        {
            return res.status(404).send({
                message: "Admin name Required"
            })
        }
        if(password == "")
        {
            return res.status(404).send({
                message: "Password Required"
            })
        }
        const user = await AdminData.findOne({adminname})
 
        if(!user)
        {
            return res.status(404).send({
                message:"Username Doesn't match"
            })
        }

        const passwordValidation = await bcrypt.compare(password,user.password)
        if(!passwordValidation)
        {
            return res.status(404).send({
                message:"Password Doesn't match"
            })
        }
        user.password = null
        const token = jwt.sign({sub:user},process.env.ADMIN_JWT_KEY,{expiresIn:'7d'})
        return res.status(202).send({
            message:"Logged In",
            Admindata:user,
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

module.exports={userdata,userupdate,adminlogin,adminsignup}