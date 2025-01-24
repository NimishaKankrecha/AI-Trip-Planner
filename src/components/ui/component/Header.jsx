import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc"
import axios from 'axios'

function Header() {
  const users = JSON.parse(localStorage.getItem('user'));
  const [openDilouge, setOpenDilouge] = useState(false);

  useEffect(() => {
    console.log("User data:", users); // Debugging
  }, []);

  const login = useGoogleLogin({
    onSuccess: (coderesp) => {
      console.log(coderesp); // Logs the token info
      getUserProfile(coderesp); // Call function to fetch user details
    },
    onError: (error) => console.log(error),
  });

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
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDilouge(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className='shadow-sm flex justify-between items-center px-5 p-3'>
      <img src='/logo.svg' />
      <div>
        {users ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
            <Button variant="outline" className="rounded-full">Create Trip</Button>
            </a>
            <a href='/my-trips'>
            <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={users?.picture} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                    className="cursor-pointer h-10 w-28 my-3 bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center text-center hover:bg-red-700 transition duration-300 ease-in-out"
                    onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDilouge(true)}>Sign in</Button>
        )}
      </div>

      {/* Dialog for Google Sign In */}
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
  )
}

export default Header;
