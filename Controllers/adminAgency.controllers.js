const AgencyData = require('../models/agency.model')
const PackageData = require('../models/touristPackages.model')

    // TRAVEL AGENCY CONTROLLERS


    const agencydata=async(re1,res)=>{
        try 
        {
            const response = await AgencyData.find()
            if(!response || response.length === 0)
            {
                return res.status(404).send({
                    message:"Users not found"
                })
            }
            return res.status(200).send({
                message:"User data fetched Successfully",
                agencydata:response
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
    
            const response = await AgencyData.findOneAndUpdate({ _id: id }, { $set: { isBlocked } },  { new: true });
    
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
            
            const response = await PackageData.find({Agency_id:id})
            if(response.length === 0)
            {
                return res.status(404).send({
                    message: "ID doesn't Match"
                })
            }
            return res.status(200).send({
                message: "Data fetched",
                packagedata:response
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
    
            const response = await PackageData.findOneAndUpdate({ _id: id }, { $set: { Status , Disabled } },  { new: true }
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

    
    
    
    
    module.exports={agencydata,able,display,packageupdate}