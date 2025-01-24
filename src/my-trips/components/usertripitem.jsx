import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Globalapi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

function UserTripItem({ trip }) {

  const [photoUrl ,setPhotoUrl] =useState();
        useEffect(()=>{
          trip&&GetPlacePhoto();
        },[trip]);
        
        const GetPlacePhoto=async()=>{
          const data={
            textQuery:trip?.userSelection?.location?.label
          }
          const result=await GetPlaceDetails(data).then(resp=>{
            console.log(resp.data.places[0].photos[4].name);
  
            const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[4].name);
            setPhotoUrl(photoUrl);
          }
  
          )
        }


  return (

    <Link to={'/view-trip/'+trip?.id}>
    <div className='mt-5 hover:scale-105'>
      {/* You can use data from the 'trip' prop here */}
      <img src={photoUrl} className='object-cover rounded-xl w-full h-64' alt="Trip" />
      {/* Add more fields from the 'trip' data */}
      <h3 className='font-bold text-lg mt-2'>{trip.userSelection.location?.label}</h3>
      <p>{trip.userSelection.budget}</p>
      <p>{trip.userSelection.Days} days trip</p>
    </div>
    </Link>
  );
}

export default UserTripItem;
