import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router'
import Footer from '@/view-trip/components/Footer'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-19' >
      <h1 className='font-extrabold text-center mt-16'>
        <span className='text-[#f65651]' >
          Discover Your Next adventure ,Where AI Meets Adventure: </span>
          Let AI Craft Your Perfect Escape,Your Personalized Travel Companion.
      </h1>
      <p className='text-center text-xl text-gray-400 py-5'>"Effortlessly plan your dream trip with personalized itineraries and real-time updates."</p>
      <Link to={'/create-trip'}>
      <Button>Get Started,It's Free</Button>
      </Link>
      <p className='mt-3 text-purple-600 font-semibold'>Click here ⬆️ for Explore your trip</p>

      <div>
        <h3 className='text-[#8176e8] font-extrabold text-xl mt-16 ml-0 p-0'>Everything you need for planning your trip</h3>
        <p>Adjust your itinerary as needed,Easily manage your entire itinerary in one place –
           rearrange, add, or remove destinations as you wish.</p>
           <img src='/iternary.png' className='mt-5  w-480 h-480 '></img>
      </div>
      <div>
        <h3 className='text-[#8176e8] font-extrabold text-xl mt-16 ml-0 p-0'>Tailored Accommodation Suggestions</h3>
        <p>Enjoy handpicked stays that align with your personal tastes, offering unparalleled comfort and convenience throughout your journey.</p>
           <img src='/hotelrecom.png' className='mt-5  w-480 h-480 '></img>
      </div>
      <div>
        <h3 className='text-[#8176e8] font-extrabold text-xl mt-16 ml-0 p-0'>Everything at your fingertips.</h3>
        <p>Whether it's a custom itinerary or a saved plan, everything is neatly arranged on one page for easy access.</p>
           <img src='/mytrips.png' className='mt-5  w-480 h-480 '></img>
      </div>
        <div>
        <Footer/>
        </div>
    </div>
  )
}

export default Hero
