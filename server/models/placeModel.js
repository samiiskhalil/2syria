const mongoose=require('mongoose')
const placeSchema=new mongoose.Schema({
    name:{type:String,required:true},
    photos:[mongoose.Schema.Types.Mixed],
    location:{
        lng:{type:Number,required:true},
        lat:{type:Number,required:true}
    },
    reviews:[{
        userId:{required:true,type:mongoose.SchemaTypes.ObjectId,ref:'User'},

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
module.exports=mongoose.model('Place',placeSchema)