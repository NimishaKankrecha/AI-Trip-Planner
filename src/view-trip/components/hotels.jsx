import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Globalapi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

function Hotels({ trip }) {
  
  const [hotelPhotos, setHotelPhotos] = useState({}); // Object to store photos for each hotel

  useEffect(() => {
    if (trip?.trip?.hotelOptions) {
      fetchHotelPhotos(); // Fetch hotel photos when hotel options are available
    }
  }, [trip]);

  // Fetch photo for each hotel
  const fetchHotelPhotos = async () => {
    const updatedHotelPhotos = {}; // Temporary object to store updated photos

    for (const item of trip?.trip?.hotelOptions) {
      if (item?.hotelName) {
        const data = { textQuery: item?.hotelName };

        // Fetch the photo details
        const result = await GetPlaceDetails(data);
        const photoName = result?.data?.places[0]?.photos?.[1]?.name;

        if (photoName) {
          // Construct the photo URL and store it in the updatedHotelPhotos object
          const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
          updatedHotelPhotos[item?.hotelName] = photoUrl;
        }
      }
    }

    // Update state with the fetched photo URLs for all hotels
    setHotelPhotos(updatedHotelPhotos);
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.trip?.hotelOptions?.map((item, index) => {
          const photoUrl = hotelPhotos[item?.hotelName]; // Get the photo URL for the current hotel

          return (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${item?.hotelName},${item?.hotelAddress}`}
              target="_blank"
            >
              <div className="hover:scale-105 transition-all cursor-pointer">
                {/* Display hotel image if available */}
                {photoUrl && (
                  <img src={photoUrl} alt={item?.hotelName} className="rounded-xl mt-5 h-[180px] w-full" />
                )}

                <div className="my-2">
                  <h2 className="text-lg">{item?.hotelName}</h2>
                  <h2 className="text-sm text-gray-400"> 📍{item?.hotelAddress}</h2>
                  <h2 className="text-base">💸 {item?.price}</h2>
                  <h2 className="text-sm">🌟 Rating: {item?.rating}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
