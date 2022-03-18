import React from 'react'
import {getProviders, signIn, useSession} from 'next-auth/react'
function Login({providers}) {
  const {data: session, status} = useSession();
  console.log(session);
  return (
    <div className='grid place-content-center max-w-500px mx-auto text-center h-screen '>
      <img className='w-[200px] mb-5 mx-auto mt-[2rem]' src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png" alt="" />
      <hr/>
      {Object.values(providers).map(provider => (
        <div className='mt-[2rem]' key={provider.name}>
          <button className='py-2 px-6 bg-[#18d860] rounded-[20px] text-white text-bold' onClick={()=> signIn(provider.id, { callbackUrl: "/"})}>Login with {provider.name}</button>
        </div>
      ))
      }
    </div>
  )
}

export default Login;
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  }
} 