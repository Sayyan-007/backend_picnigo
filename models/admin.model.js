const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        adminname:{type:String,required:[true, 'fullname required']},
        password:{type:String,required:[true, 'password required']}
    },
    {
        timestamps:true
    }
)

const AdminData = model('admins',schema)
module.exports = AdminData