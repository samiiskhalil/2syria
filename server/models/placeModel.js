const mongoose=require('mongoose')
const placeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    gpsCoordinates:{
        longitude:{type:Number,required:true},
        latitude:{type:Number,required:true}
    },
    reviews:[{
        userId:{required:true,type:mongoose.SchemaTypes.ObjectId,ref:'userModel'},

        rating:{
            type:Number,
            min:0,
            max:5
        },
        review:String
    }],
    describtion:String,
    type:{type:String,required:true}
})
module.exports=mongoose.model('placeModel')