const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        username:{type:String,required:[true, 'username required'],unique:[true,'username already found']},
        email:{type:String,required:[true, 'email required'],unique:[true,'email already found']},
        phone_Number:{type:Number,required:[true, 'phone number required'],unique:[true,'phone number already found']},
        password:{type:String,required:[true, 'password required']},
        confirm_password:{type:String,required:[true, 'confirm_password required']},
        isBlocked:{type:Boolean,default : false}
    },
    {
        timestamps:true
    }
)

const HotelMangmentData =model('hotelmangments',schema)

module.exports=HotelMangmentData