const Place = require('../models/placeModel.js');
const placeMiddleware=require('../middleware/placeMiddleware.js')
class placeController{
    constructor(){

    }
   
    static async get_places(req,res){
        try
        {
            const {radius,unit,type,userLng,userLat}=req.query
            console.log(unit)
            if(!radius)
                return res.json({success:false,message:'radius was not given'})
            if(unit!='mi'&&unit!='km')
                return res.json({success:false,message:'not a supported unit or format'})
           const places=type?await Place.find({type}):await Place.find()
            console.log(places.length)
            if(!places.length)
                return res.json({success:false,message:'no places were found try another query'})
            const filtered_places=placeMiddleware.filter_places_by_radius(userLat,userLng,unit,type,places,radius)
            if(!filtered_places)
                return res.json({success:false,message:'no places were found try another query'})
                console.log(filtered_places.length)
                return res.json({success:true,places:filtered_places})
        }
        catch(error){
            console.log(error)
            return res.json({success:false,message:error.message})
        }
    }
static async get_photo(req,res){
    try{
        const url=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.query.photoReference}&key=${process.env.KEY}`
        res.redirect(url)
    }
    catch(err){
        console.log(err)
        return res.json({success:false,message:'internal server error'})
    }
}
}
module.exports=placeController