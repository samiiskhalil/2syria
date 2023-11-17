const Place=require('../models/placeModel.js')
const mongoose=require('mongoose')
const fs=require('fs')
mongoose.connect('mongodb://127.0.0.1/2syria').then(()=>{

    let places=JSON.parse(fs.readFileSync('../data/places.json'))
    places=places.map(place=>({
        name:place.name,
        location:place.geometry.location,
    place_id:place.place_id,
    reference:place.reference,
    type:place.type,
    photos:place.photos,
    description:'',
    address:place.formatted_address,
    avgRating:0

}))
Place.insertMany(places).then(res=>console.log('done')).catch(err=>console.log(err))
console.log(places[300])
}).catch(err=>console.log(err))