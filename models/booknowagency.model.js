const {Schema, model}=require('mongoose')

const schema = new Schema({

    user_id:{type:String,default:""},
    user_name:{type:String,default:""},
    Category:{type:String,default:""},
    package_id:{type:String,default:""},
    package_name:{type:String,default:""},
    host_id:{type:String,default:""},
    host_name:{type:String,default:""},
    host_type:{type:String,default:""},
    package_amount:{type:Number,default:0},
    date:{type:String,default:""}

},{
    timestamps:true
})

const BookNow=model('BookNow',schema)

module.exports=BookNow