const UserData=require('../models/user.model')
const BookNowTourist = require("../models/booknowagency.model");



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



module.exports={userdata,userupdate}