import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router';
import { db } from '@/service/firebaseconfig';
import UserTripItem from './components/usertripitem';

function Mytrips() {
    const navigate = useNavigate(); // Corrected: useNavigate instead of useNavigation
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        getUserTrips();
    }, []);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate("/"); // Redirect to home if no user found
            return;
        }

        const q = query(collection(db, 'AITrip'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);

        // Initialize an array to hold all trips
        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            trips.push(doc.data()); // Add each trip to the array
        });

        // Update the state with all the trips at once
        setUserTrips(trips);
    };


  return (
    <div className='sm:px-10 md:px-32 lg:px-36 xl:px-72 px-5 mt-10'>
    <h2 className='font-bold text-3xl text-blue-700 hover:underline'>My Trips</h2>

    <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
        {/* Map through the user trips and return UserTripItem */}
        {userTrips.map((trip, index) => {
            return <UserTripItem key={index} trip={trip} />;
        })}
    </div>
</div>
);
}
export default Mytrips
