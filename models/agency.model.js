const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        Agency_Name:{type:String,required:[true, 'Agency Name required'],unique:[true,'Agency Name already found']},
        email:{type:String,required:[true, 'email required'],unique:[true,'email already found']},
        phone_Number:{type:Number,required:[true, 'phone number required'],unique:[true,'phone number already found']},
        District:{type:String,required:[true,'District required']},
        State:{type:String,required:[true,'State required']},
        isBlocked:{type:Boolean,default:false},
        password:{type:String,required:[true, 'password required']},
        confirm_password:{type:String,required:[true, 'confirm_password required']}
    },
    {
        timestamps:true
    }
)

const AgencyData =model('agencyinfos',schema)

module.exports=AgencyData