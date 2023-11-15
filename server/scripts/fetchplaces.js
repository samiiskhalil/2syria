const axios = require("axios");
const fs = require("fs");
require('dotenv').config()
const filePath = "./places.json";
let places=[]
const key = process.env.KEY;
const url = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const types = [
  "historical",
  "restaurant",
  "great views",
  "religios",
  "old ruins",
];
const cities = [
  "Damascus",
  "Aleppo",
  "Homs",
  "Hama",
  "Latakia",
  "Deir ez-Zor",
  "Raqqa",
  "Idlib",
  "Tartus",
  "Daraa",
  "As-Suwayda",
  "Palmyra",
  "Qamishli",
  "Manbij",
  "Salamiyah",
  "Yabroud",
  "Maarat al-Numan",
  "Al-Bab",
  "Safita",
  "Tadmur",
];
// cities.forEach(ciry=>{

// })
function appendDataToFile(places, filePath) {
  const jsonData = JSON.stringify(places, null, 2);
  fs.writeFile(filePath,jsonData, "utf8", (err) => {
      if (err) {
        console.error("Error appending to JSON file:", err);
      } else {
      }
    });
  }
  async function getPlaces(city, url, key, placesType, pagetoken) {
  try {
    let { data } = await axios.get(url, {
      params: {
        query: `${placesType} places in ${city} syria `,
        key,
      },
    });
    let { results, next_page_token } = data;
    console.log(results)
    results.forEach(place => {
      place.type=placesType
      // appendDataToFile(place, filePath);
    });
    places.push(...results)
  } catch (err) {
    console.log(err);
    throw err;
  }
}
let counter = 0;
async function fetchPlaces() {

  for (const placesType of types) {
    for (const city of cities) {

      await getPlaces(city, url, key, placesType);

      console.log(`${placesType} places in ${city} syria ` );
      counter++
    }
  }
}
async function go(){

 await fetchPlaces();
  appendDataToFile(places,'./places.json')
}
// go()
