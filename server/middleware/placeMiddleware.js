const Place = require("../models/placeModel.js");

class placeMiddleware {
  constructor() {}
  static async add_review(place, review, userId) {
    try {
        // Create a new review object
        const newReview = {
            userId: userId,
            rating: review.rating,
            review: review.comment
        };

        // Push the new review to the place's reviews array
        place.reviews.push(newReview);

        // Calculate the new average rating for the place
        let totalRating = 0;
        for (let review of place.reviews) {
            totalRating += review.rating;
        }
        place.avgRating = totalRating / place.reviews.length;

        // Save the updated place
        const updatedPlace = await place.save();

        return updatedPlace;
    } catch (error) {
        throw error;
    }
}

  static calculate_distance(userLat, userLng, placeLat, placeLng) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    const earthRadiusKm = 6371;

    const latDiff = deg2rad(placeLat - userLat);
    const lngDiff = deg2rad(placeLng - userLng);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(deg2rad(userLat)) *
        Math.cos(deg2rad(placeLat)) *
        Math.sin(lngDiff / 2) *
        Math.sin(lngDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance;
  }

  static filter_places_by_radius(userLat, userLng, unit, type, places, radius) {
    const filteredPlaces = places.filter((place) => {
      const distance = placeMiddleware.calculate_distance(
        userLat,
        userLng,
        place.location.lat,
        place.location.lng
      );

      if (unit === "km" && distance <= radius) {
        return true;
      } else if (unit === "mi" && distance <= radius * 0.621371) {
        return true;
      } else {
        return false;
      }
    });

    return filteredPlaces;
  }
}

module.exports = placeMiddleware;
