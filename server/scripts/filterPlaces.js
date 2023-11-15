const fs=require('fs')
let places=JSON.parse(fs.readFileSync('../data/places1.json'))
const names=places.map(place=>({name:place.name}))
console.log(names)
fs.writeFileSync('../data/names.json',JSON.stringify(names))
console.log('done')


// function isArabic(name) {
//     const arabicPattern = /[\u0600-\u06FF]/;
//     return arabicPattern.test(name);
//   }
  
//   // Sort the places array based on whether the name is in Arabic or English
//   places.sort((a, b) => {
//     if (isArabic(a.name) && !isArabic(b.name)) {
//       return -1; // a comes first if it's in Arabic
//     } else if (!isArabic(a.name) && isArabic(b.name)) {
//       return 1; // b comes first if it's in Arabic
//     } else {
//       return a.name.localeCompare(b.name); // Otherwise, use default string comparison
//     }
//   });
  
//   // Output the sorted places array
//   fs.writeFileSync('../data/places1.json',JSON.stringify(places))
