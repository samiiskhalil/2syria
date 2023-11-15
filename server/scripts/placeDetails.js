require('dotenv').config()
const axios=require('axios')
const fs=require('fs')
const places=JSON.parse(fs.readFileSync('./places.json'))
let details=[]
let counter=0
async function go(){

  for(let i=0;i<places.length;i++)
  {
    const {data}=await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${places[i]['place_id']}&key=${process.env.KEY}`)
    counter++
    fs.writeFileSync('./details.json',JSON.stringify(data))
    console.log(i)
  }

}
go()