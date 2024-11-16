import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import useAuth from '../../hook/useAuth'
import CustomRoutes from '../../routes'
import Navbar from '../../components/Navbar'
import SiteBar from '../../components/SiteBar'
import SpotifyWebPlayer from 'react-spotify-web-playback'

function Dashboard({ code }) {
    const getCode = useAuth(code)
    const { accessToken, setPlaying, play } = useContext(Context)

    return (
        <div className='relative flex justify-between'>
            <Navbar />
            <div className='w-[62%] h-[100vh] overflow-y-auto'>
                <CustomRoutes />
            </div>
            <SiteBar />
            <div className='absolute bottom-0 w-full'>
                <SpotifyWebPlayer
                    token={accessToken}
                    play={play ? [play] : []}
                    callback={(e) => {
                        if (e.isPlaying) {
                            setPlaying(false)
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Dashboard