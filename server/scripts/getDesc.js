const fs=require('fs')
let data={}
const places=JSON.parse(fs.readFileSync('./../data/places.json'))
data=places.map((place)=>({
    name:place.name,
    address:place.address
}))
fs.writeFileSync('../data/dbplaces.json',JSON.stringify(data))
console.log('done')