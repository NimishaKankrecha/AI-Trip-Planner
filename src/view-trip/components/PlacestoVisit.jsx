import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Globalapi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Placestovisit({ trip }) {
  // Log the itinerary data to check its structure (optional for debugging)
  console.log(trip?.trip?.itinerary);

  const [photoUrls, setPhotoUrls] = useState({}); // Store photo URLs for each activity

  useEffect(() => {
    if (trip?.trip?.itinerary) {
      getPlacePhotos(); // Fetch images when itinerary is available
    }
  }, [trip]);

  const getPlacePhotos = async () => {
    const updatedPhotoUrls = {}; // To store the updated photo URLs
    const activities = [];

    // Loop through all the activities in the itinerary
    Object.entries(trip?.trip?.itinerary).forEach(([dayKey, day]) => {
      day?.activities?.forEach((activity) => {
        activities.push(activity);

        // Fetch photo for each activity
        if (activity.placeName) {
          const data = { textQuery: activity.placeName };
          GetPlaceDetails(data).then((resp) => {
            if (resp.data.places[0]?.photos?.[1]?.name) {
              const photoUrl = PHOTO_REF_URL.replace(
                '{NAME}',
                resp.data.places[0].photos[1].name
              );
              updatedPhotoUrls[activity.placeName] = photoUrl; // Update the photo URL for this activity
              setPhotoUrls({ ...updatedPhotoUrls }); // Update the state with new photo URLs
            }
          });
        }
      });
    });
  };

  return (
    <div>
      <h2 className='font-bold text-lg'>Places To Visit</h2>
      <div className='grid grid-cols-2 gap-10'>
        {trip?.trip?.itinerary && Object.keys(trip?.trip?.itinerary).length > 0 ? (
          Object.entries(trip.trip.itinerary).map(([dayKey, day], index) => (
            <div key={index} className='my-5'>
              {/* Display the day key in sentence case */}
              <h2 className='font-medium text-xl'>
                {dayKey.charAt(0).toUpperCase() + dayKey.slice(1).toLowerCase()}
              </h2>
              <p className='font-medium text-lg hover:underline'>{day?.theme}</p>

              <div>
                {day?.activities &&
                  day.activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className='my-3 hover:scale-105 transition-all cursor-pointer'
                    >
                      {/* Display place image if available */}
                      {photoUrls[activity.placeName] && (
                        <img
                          src={photoUrls[activity.placeName]}
                          alt={activity.placeName}
                          className=' w-[580px]  h-[280px] object-cover rounded-lg mb-3'
                        />
                      )}

                      <Link
                        to={`https://www.google.com/maps/search/?api=1&query=${activity?.placeName}`}
                        target='_blank'
                      >
                        {/* Display place name */}
                        {activity.placeName && (
                          <p className='text-md font-semibold text-blue-600'>
                            🏄 {activity.placeName}
                          </p>
                        )}

                        {/* Display best time to visit */}
                        {activity.bestTimeToVisit && (
                          <p className='text-sm text-gray-600'>
                            ⏱️ Best time to visit: {activity.bestTimeToVisit}
                          </p>
                        )}

                        {/* Display place details */}
                        {activity.placeDetails && (
                          <p className='text-sm text-gray-800'>
                            🌼 {activity.placeDetails}
                          </p>
                        )}

                        {/* Display ticket details */}
                        {activity.ticketPricing && (
                          <p className='text-sm text-gray-800'>
                            💵 {activity.ticketPricing}
                          </p>
                        )}
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary available or itinerary is not structured correctly.</p>
        )}
      </div>
    </div>
  );
}

export default Placestovisit;
