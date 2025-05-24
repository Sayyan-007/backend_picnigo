const {Schema,model} = require('mongoose')

const schema = new Schema({
        username : {type : String,required:[true,'username required']},
        number : {type : Number,required:[true,'number required']},
        email : {type : String,required:[true,'email required']},
        message : {type : String,required:[true,'fill your message']}
},
{
    timestamps:true
})

const ContactUs = model('messages',schema)
module.exports = ContactUs
