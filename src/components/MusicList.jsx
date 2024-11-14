import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { CLIENT_ID } from '../hook/useEnv';
import SpotifyWebApi from 'spotify-web-api-node';
import MusicCard from './MusicCard';

function MusicList({API, CardTitle}) {
    const {accessToken} = useContext(Context)
    const spotifyApi = new SpotifyWebApi({
      clientId:CLIENT_ID
    })
  
    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    const [albums, setAlbums] = useState([])

    useEffect(() => {
        if (accessToken) {
            spotifyApi.searchAlbums(API).then(res => {
                setAlbums(res.body.albums.items.map(item => {
                    const data = {
                        id: item.id,
                        albumImg: item.images[0].url ,
                        albumName: item.name,
                        albumArtistName: item.artists[0].name,
                        uri: item.uri 
                    }
                    return data
                }))
            })
        }
    }, [accessToken])

    return (
        <div className='px-10'>
            <div className='flex items-center justify-between mb-[26px]'>
                <h2 className='text-white text-[30px] font-bold mb-[10px]'>{CardTitle}</h2>
                <button className='text-[#ADADAD] text-[16px] font-semibold'>SEE ALL</button>
            </div>
            <div className='flex items-center overflow-x-auto space-x-[31px] justify-between'>
                {albums.map(item => <MusicCard key={item.id} item={item}/>)}
            </div>
        </div>
    )
}

export default MusicList