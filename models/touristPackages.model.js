const {Schema, model} = require('mongoose')



const schema = new Schema(
    {
        Destination_Name:{type:String,required:[true, 'Destination Name required']},
        Destination_Image:{type:String,required:[true, 'Destination image  required']},
        Duration:{type:String,required:[true, 'Package Duration required']},
        Category:{type:String,required:[true, 'Category required']},
        Climate:{type:String,required:[true, 'Climate required']},
        Location:{type:String,required:[true, 'Location required']},
        District:{type:String,required:[true, 'District required']},
        State:{type:String,required:[true, 'State required']},
        Country:{type:String,required:[true, 'Country required']},
        Near_Locations:{type:String,required:[true, 'Near_Locations required']},
        Prize:{type:String,required:[true, 'Prize required']},
        Status:{type:String,default:"pending"},
        Disabled:{type:Boolean,default:false},
        Agency_id:{type:String,default:""},
        Agency_name:{type:String,default:""}
    },
    {
        timestamps:true
    }
)

const PackageData=model('travelpackages',schema)

module.exports= PackageData