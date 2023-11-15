const Place = require('../models/placeModel.js');
class placeController{
    constructor(){

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