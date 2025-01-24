import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudget, SelectTravelList } from '@/constants/option'
import { chatSession } from '@/service/AIModal'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseconfig'
import { RxReload } from "react-icons/rx"
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [place, setPlace] = useState();
  const [openDilouge, setOpenDilouge] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin({
    onSuccess: (coderesp) => {
      console.log(coderesp); // Logs the token info
      getUserProfile(coderesp); // Fetch the user profile after successful login
    },
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDilouge(true);
      return;
    }

    if (formData?.Days > 5) {
      toast("Please fill details.");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{nodays}', formData?.Days)
      .replace('{nobudget}', formData?.budget)
      .replace('{nopeople}', formData?.people);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());

    setLoading(false);
    saveAITrip(result?.response?.text());
  };

  const saveAITrip = async (Trip) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrip", docID), {
      userSelection: formData,
      trip: JSON.parse(Trip),
      userEmail: user?.email,
      id: docID
    });
    setLoading(false);
    navigate('/view-trip/' + docID);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Store the user data in localStorage
        setOpenDilouge(false); // Close the dialog after successful login
        onGenerateTrip(); // Proceed with generating the trip
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-36 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-400 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div>
        <div className='mt-15 flex flex-col'>
          <h2 className='font-medium text-xl py-5'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              }
            }}
          />
        </div>

        <div>
          <h2 className='font-medium text-xl py-5'>How many days are you planning your trip?</h2>
          <Input type="number" placeholder={'Ex.3'} onChange={(e) => handleInputChange('Days', e.target.value)}></Input>
        </div>

        <div>
          <h2 className='font-medium text-xl py-5'>What is Your Budget?</h2>
        </div>

        <div className='grid grid-cols-3 mt-5 gap-5'>
          {SelectBudget.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-xl hover:border-s-fuchsia-600 ${formData?.budget === item.title ? 'shadow-xl border-l-indigo-950' : ''}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-3 mt-5 gap-5'>
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('people', item.people)}
              className={`p-4 border rounded-lg hover:shadow-xl hover:border-s-fuchsia-600 ${formData?.people === item.people ? 'shadow-xl border-l-indigo-950' : ''}`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>

        <div className='justify-self-end my-5'>
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? <RxReload className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
          </Button>
        </div>

        {/* Dialog for Sign In */}
        <Dialog open={openDilouge} onClose={() => setOpenDilouge(false)}>
          <DialogContent>
            <DialogHeader>
              <Button className="absolute top-2 right-2" onClick={() => setOpenDilouge(false)}>
                X
              </Button>
              <DialogDescription>
                <img src='/logo.svg' />
                <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
                <p>Sign in to the App with Google authentication securely</p>

                <Button onClick={login} className="w-full mt-5 flex gap-4">
                  <FcGoogle className='h-7 w-7' />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateTrip;
