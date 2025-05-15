const CampData = require('../models/camporganization.model')
const CampPackages = require('../models/camppackage.model')
const BookNowTourist = require("../models/booknowagency.model");


    // TRAVEL CAMP ORAGANIZATION CONTROLLERS


const campdata=async(re1,res)=>{
    try 
    {
        const response = await CampData.find()
        if(!response || response.length === 0)
        {
            return res.status(404).send({
                message:"Users not found"
            })
        }
        return res.status(200).send({
            message:"User data fetched Successfully",
            campdatas:response
        })
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(500).send({
            message:"Internal Server Error"
        })
    }
}


const able = async (req, res) => {
    try {
        const { id } = req.query;
        const { isBlocked } = req.body;

        const response = await CampData.findOneAndUpdate({ _id: id }, { $set: { isBlocked } },  { new: true });

        if (response) {
            return res.status(200).send({
                message: "Package Updated",
                updatedPackage: response
            });
        }

        return res.status(400).send({
            message: "Package Not Found or Not Updated"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Server Error"
        });
    }
};


const display=async(req,res)=>{

    try 
    {
        const {id}=req.query
        if(!id)
        {
            return res.status(400).send({
                message: "id Required"
            })
        }
        const response = await CampPackages.find({organization_id:id})
        if(response.length === 0)
        {
            return res.status(404).send({
                message: "ID doesn't Match"
            })
        }
        return res.status(200).send({
            message: "Data fetched",
            camppackageDatas:response
        })
    } 
    catch (error) 
    {
        console.log(error);
        return res.status(400).send({
            message:error.message || "internal Server Error"
        })
    }
}

const packageupdate = async (req, res) => {
    try {
        const { id } = req.query;
        const { Status ,Disabled } = req.body;

        const response = await CampPackages.findOneAndUpdate({ _id: id }, { $set: { Status , Disabled } },  { new: true }
        );

        if (response) {
            return res.status(200).send({
                message: "Package Updated",
                updatedPackage: response
            });
        }

        return res.status(400).send({
            message: "Package Not Found or Not Updated"
        });
        
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message || "Server Error"
        });
    }
};

const Chart = async (req, res) => {
    try {
            const totalbookings = await BookNowTourist.countDocuments();
            const totalPackageAmountdemo = await BookNowTourist.aggregate([{ $match: { host_type: "Camp" } }, { $group: { _id: null ,total_amount: { $sum: "$package_amount" } } }])
            const usercountdemo = await BookNowTourist.aggregate([{ $match: { host_type: "Camp" } }, { $group: { _id: null ,bookCount: { $sum: 1 } } }])
            const usercount = usercountdemo.length > 0 ? usercountdemo[0].bookCount : 0;
            const totalPackageAmount = totalPackageAmountdemo.length > 0 ? totalPackageAmountdemo[0].total_amount : 0;

            const CampBookings = await BookNowTourist.aggregate([
                { $match: { host_type: "Camp" } },
                {
                    $group: {
                        _id: "$host_id",
                        HostCount: { $sum: 1 },
                        userTotalpackage: { $sum: "$package_amount" },
                        username: { $first: "$host_name" }
                    }
                },
                {
                    $addFields: {
                        Userpercentage: { $round: [{ $multiply: [{ $divide: ["$HostCount", usercount] }, 100] }, 2] },
                        userTotalpackagePersentage: { $round: [{ $multiply: [{ $divide: ["$userTotalpackage", totalPackageAmount] }, 100] }, 2] }
                    }
                }
            ]); 
            if(totalbookings.length === 0)
                {
                    return res.status(404).send({
                        message: "No Booking Available"
                    })
                }
                return res.status(200).send({
                    message: "Data fetched",
                    Campbooked:CampBookings,
                    count:usercount
                })
    }
    catch (error) 
    {

        console.log(err);
        return res.status(500).send({
            message: err.message || "Server Error"
        });

    }
}


module.exports={campdata,able,display,packageupdate,Chart}