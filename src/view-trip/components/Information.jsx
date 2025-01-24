import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/Globalapi';
import React, { useEffect, useState } from 'react'
import { TbLocationShare } from "react-icons/tb";


function Information({trip}) {

      const [photoUrl ,setPhotoUrl] =useState();
      useEffect(()=>{
        trip&&GetPlacePhoto();
      },[trip]);
      
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:trip?.userSelection?.location?.label
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[3].name);

          const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setPhotoUrl(photoUrl);
        }

        )
      }

  return (
    <div>
     <h3 className='font-bold text-2xl justify-between items-center mb-5 ml-36 text-orange-700 cursor-pointer'>Your Personalized Itinerary,Explore Your Journey.</h3> 
     <img src={photoUrl}/>


    <div className='flex justify-between items-center'>
    <div className='my-5 flex flex-col gap-2' >       
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex gap-5 mt-5'>
           <h2 className='p-1 px-3 bg-blue-100 rounded-full text-gray-900'>🗓️ {trip?.userSelection?.Days} Day</h2>
           <h2 className='p-1 px-3 bg-blue-100 rounded-full text-gray-900'>💰 {trip?.userSelection?.budget} Budget</h2>
           <h2 className='p-1 px-3 bg-blue-100 rounded-full text-gray-900'>🌈 No. of Traveller : {trip?.userSelection?.people}</h2>
        </div>
        </div>
        <Button><TbLocationShare /></Button>
    </div>
    </div>
  )
}

export default Information
