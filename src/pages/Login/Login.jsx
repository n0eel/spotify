import React from 'react'
import { CLIENT_ID } from '../../hook/useEnv'

function Login() {
    const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`

  return (
    <div className='bg-login w-full h-[100vh] flex items-center justify-center'>
        <a className='w-[180px] hover:scale-[1.1] duration-200 p-2 rounded-md bg-green-500 text-white font-semibold text-center' href={AUTH_URL}>Login to spotify</a>
    </div>
  )
}

export default Login