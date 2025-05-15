const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const BookNowTourist = require("../models/booknowagency.model");
require("dotenv").config();

const create = async (req, res) => {
    try {
        const { user_id, user_name, Category, package_id, package_name, package_amount, date, host_name,host_id,host_type } = req.body;

        if (!user_id || !package_id || !package_amount) {
            return res.status(400).send("Missing required fields");
        }

        // Set currency to "usd" by default
        const currency = "usd";

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: package_amount * 100, // Convert to cents
            currency,
            payment_method_types: ["card"],
        });

        // Save to MongoDB
        const newBooking = new BookNowTourist({
            user_id,
            user_name,
            Category,
            package_id,
            package_name,
            package_amount,
            host_name,
            host_id,
            host_type,
            date
        });

        await newBooking.save(); // Wait until saved

        // Send response (only once)
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
            message: "Payment Intent created & booking saved!",
            currency,
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
};


const display=async(req,res)=>{

    try 
    {
        const response = await BookNowTourist.find()
        const Amount = await BookNowTourist.aggregate([{$group:{_id:"$host_type",count:{$sum:1},totalPackageAmount: { $sum: "$package_amount" }}}])
        const total_amount = Amount.reduce((acc, item) => acc + item.totalPackageAmount, 0)
        const persentage= Amount.map((item)=>({host_type:item._id,totalpackageamt:item.totalPackageAmount,per:((item.totalPackageAmount/total_amount)*100).toFixed(2)}))
        const usercountdemo = await BookNowTourist.aggregate([{ $match: { host_type: "Agency" } }, { $group: { _id: null ,bookCount: { $sum: 1 } } }])
        const totalbookings = usercountdemo.length > 0 ? usercountdemo[0].bookCount : 0;
        const totalPackageAmount1 = await BookNowTourist.aggregate([{$match:{host_type:"Agency"}},{$group:{_id:null,total_amount:{$sum:"$package_amount"}}}])
        const totalPackageAmount2 = totalPackageAmount1.length > 0 ? totalPackageAmount1[0].total_amount: 0 ;
        const totalAmountdemo = await BookNowTourist.aggregate([{$group:{_id:null,total_amount:{$sum:"$package_amount"}}}])
        const totalAmount = totalAmountdemo.length > 0 ? totalAmountdemo[0].total_amount: 0 ;
        
        async function getBookingsByHostType(hostType) {
            return await BookNowTourist.aggregate([
                { $match: { host_type: hostType } },
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
                        Userpercentage: { $round: [{ $multiply: [{ $divide: ["$HostCount", totalbookings] }, 100] }, 2] },
                        userTotalpackagePersentage: { $round: [{ $multiply: [{ $divide: ["$userTotalpackage", totalPackageAmount2] }, 100] }, 2] }
                    } 
                }
            ]);
        }
        
        // Call the function for different host types
        const agencyBookings = await getBookingsByHostType("Agency")
        const campBookings = await getBookingsByHostType("Camp");


        
        if(response.length === 0)
        {
            return res.status(404).send({
                message: "No Booking Available"
            })
        }
        return res.status(200).send({
            message: "Data fetched",
            Booked:response,
            count:response.length,
            Amount:Amount,
            Persentage:persentage,
            Agencybooked:agencyBookings,
            Campbooked:campBookings,
            total:totalAmount
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


module.exports={create,display}