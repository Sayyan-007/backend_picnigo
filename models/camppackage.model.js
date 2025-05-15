const {Schema, model}=require('mongoose')

const schema = new Schema({

    campName:{type:String,required:[true, 'campname required'],unique:[true,`camp is already exist`]},
    campIcon:{type:String,required:[true, 'campname required']},
    location:{type:String,required:[true, 'location required']},
    contactNumber:{type:Number,required:[true, 'contactNumber required']},
    date:{type:String,required:[true, 'date required']},
    duration:{type:String,required:[true, 'duration required']},
    type:{type:String,required:[true, 'type required']},
    prize:{type:Number,required:[true, 'prize required']},
    Status:{type:String,default:"pending"},
    Disabled:{type:Boolean,default:false},
    organization_id:{type:String,default:""},
    organization_name:{type:String,default:""}

},{
    timestamps:true
})

const camppackage=model('camppackages',schema)

module.exports=camppackage