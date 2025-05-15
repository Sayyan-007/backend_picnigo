const {Schema, model} = require('mongoose')



const schema = new Schema(
    {
        Hotel_Name:{type:String,required:[true, 'Hotel Name required']},
        Hotel_Image:{type:String,required:[true, 'Hotel image required']},
        Contact_Number:{type:Number,required:[true, 'Number required']},
        Duration:{type:String,required:[true, 'Package Duration required']},
        Type:{type:String,required:[true, 'Type required']},
        Location:{type:String,required:[true, 'Location required']},
        District:{type:String,required:[true, 'District required']},
        State:{type:String,required:[true, 'State required']},
        Prize:{type:String,required:[true, 'Prize required']},
        Status:{type:String,default:"pending"},
        Disabled:{type:Boolean,default:false},
        Mangment_id:{type:String,default:""},
        Mangment_name:{type:String,default:""}
    },
    {
        timestamps:true
    }
)

const HotelPackageData=model('hotelpackages',schema)

module.exports= HotelPackageData