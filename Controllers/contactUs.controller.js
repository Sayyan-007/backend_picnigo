const ContactUs = require("../models/contactUs.model")

const create = async (req, res) => {

    try {

        const { username, number, email, message } = req.body;

        if (!username || !number || !email || !message) {
            return res.status(400).send({
                message: "fill the feilds"
            });
        }

        const response = await ContactUs.create({ username, number, email, message });
        if (!response) {
            return res.status(404).send({
                message: "Bad Request: Unable to create tourism package"
            })
        }
        return res.status(200).send({
            message: "Admin will contact you soon",
            data: response
        })

    } catch (error) 
    {
        console.log(error);
        return res.status(404).send({
            message:error.message || "internal Server Error"
        })
        
    }

}

const display = async(req,res) => {


    try 
    {
        const response =await ContactUs.find()
        if(!response)
        {
            return res.status(404).send({
                message:"No Messages"
            })
        }
        return res.status(200).send({
            message:"data fetched",
            feedback:response
        })
    } 
    catch (error) 
    {
        return res.status(500).send({
            message:"Internal Error Occured"
        })
        
    }

}

module.exports = {create,display}