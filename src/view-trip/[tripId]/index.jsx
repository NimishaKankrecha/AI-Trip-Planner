import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Information from '../components/Information';
import Hotels from '../components/hotels';
import Placestovisit from '../components/PlacestoVisit';
import Footer from '../components/Footer';

function Viewtrip() {
  
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
        tripId&&getTripData();
    },[tripId]);

    const getTripData=async()=>{
        const docRef = doc(db, "AITrip", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
            } else {
            console.log("No such document!");
           
    }
    }
       
    return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'> 

        <Information trip ={trip} />
        <Hotels trip={trip}/>
        <Placestovisit trip={trip}/>
        <Footer trip={trip}/>

    </div>
  )
}

export default Viewtrip
