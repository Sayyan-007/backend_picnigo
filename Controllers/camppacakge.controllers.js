const express = require('express')
const camppackage = require('../models/camppackage.model')

const create = async (req, res) => {

    try {

        const { body } = req
        const response = await camppackage.create(body)
        if (!response) {
            return res.status(404).send({
                message: "Bad Request: Unable to create tourism package"
            })
        }
        return res.status(200).send({
            message: "camp Package Created Successfully",
            camppackageDatas: response
        })

    } catch (error) 
    {
        console.log(error);
        return res.status(404).send({
            message:error.message || "internal Server Error"
        })
        
    }

}

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
        const response = await camppackage.find({organization_id:id})
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


const able = async (req, res) => {
    try {
        const { id } = req.query;
        const { Disabled } = req.body;

        const response = await camppackage.findOneAndUpdate({ _id: id }, { $set: { Disabled } },  { new: true });

        if(response.Status === "reject")
        {
            return res.status(201).send({
                message:"Package Blocked by Admin"
            })
        } 
        if(response.Status === "pending")
        {
            return res.status(201).send({
                message:"Package not Accepted by Admin"
            })
        } 

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

const update = async(req,res) =>{

    try 
    {
        const { campName,campIcon,location,contactNumber,date,duration,type,prize } = req.body
        const {id} = req.query
        const response = await camppackage.updateOne({_id : id} ,{$set: {campName,campIcon,location,contactNumber,date,duration,type,prize}})    
        if(response.modifiedCount > 0)
        {
            return res.status(200).send({
                message:"Updated Successfully"
            })
        }
        return res.status(400).send({
            message: "Not updated"
        })

    } 
    catch (error) 
    {
        console.log(error);
        return res.status(404).send({
            message:error.message ||"Server Error"
        })
    }

}

module.exports={create,display,able,update}