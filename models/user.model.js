const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        fullName:{type:String,required:[true, 'fullname required']},
        username:{type:String,required:[true, 'username required'],unique:[true,'username already found']},
        email:{type:String,required:[true, 'email required'],unique:[true,'email already found']},
        phone_Number:{type:Number,required:[true, 'phone number required'],unique:[true,'phone number already found']},
        password:{type:String,required:[true, 'password required']},
        confirm_password:{type:String,required:[true, 'confirm_password required']},
        isBlocked:{type:Boolean,default:"false"}
    },
    {
        timestamps:true
    }
)

const UserData =model('userinfos',schema)
module.exports=UserData