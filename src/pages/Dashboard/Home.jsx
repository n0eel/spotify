import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import Loading from '../../assets/images/loading.png'
import NavigateBtn from '../../components/NavigateBtn'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hook/useEnv'
import { Context } from '../../context/Context'

const MusicList = lazy(() => new Promise((resolve) => {
  return setTimeout(() => resolve(import("../../components/MusicList")), 500)
}))

function Home() {
  const { accessToken } = useContext(Context)
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const [homeTopTracks, setHomeTopTracks] = useState([])

  useEffect(() => {
    if (accessToken) {
      spotifyApi.searchTracks("friendly thug").then(res => {
        setHomeTopTracks(res.body.tracks.items.splice(0, 6).map(item => {
          const data = {
            id: item.id,
            trackName: item.name,
            trackImg: item.album.images[0].url,
            artistsName: item.artists[0].name,
            uri: item.uri
          }
          return data
        }))
      })
    }
  }, [accessToken])

  return (
    <div className='bg-home h-auto'>
      <NavigateBtn />
      <div className='pt-[30px] px-10 pb-[50px]'>
        <h2 className='font-bold text-[30px] text-white mb-[29px]'>Good afternoon</h2>
        <ul className='flex justify-between flex-wrap gap-[16px]'>
          {homeTopTracks.map(item => (
            <li className='flex items-center overflow-hidden space-x-[22px] w-[49%] bg-item rounded-[6px] cursor-pointer' key={item.id}>
              <img src={item.trackImg} alt="Track Img" width={82} height={82} />
              <h3 className='text-[20px] font-semibold text-white'>{item.trackName}</h3>
            </li>
          ))}
        </ul>
      </div>
      <div className='space-y-[50px]'>
        <Suspense fallback={<img className='mx-auto' src={Loading} width={100} />}>
          <MusicList API={"Lil Uzi Vert"} CardTitle={"Your top mixes"} />
          <MusicList API={"Drake"} CardTitle={"Made for you"} />
          <MusicList API={"Lildrughill"} CardTitle={"Recently played"} />
          <MusicList API={"Bushido Zho"} CardTitle={"Jump back in"} />
          <MusicList API={"Playboy carti"} CardTitle={"Uniquely yours"} />
        </Suspense>
      </div>
    </div>
  )
}

export default Home