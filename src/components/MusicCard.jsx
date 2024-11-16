import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { useNavigate } from 'react-router-dom'

function MusicCard({item}) {
  const navigate = useNavigate()
  const {setPlay, setPlaying} = useContext(Context)

  function handlePlayAlbum() {
    setPlay(item.uri)
    setPlaying(true)
    navigate(`/music/${item.id}`)
  }
 
  return (
    <div onClick={handlePlayAlbum} className='min-w-[224px] p-5 rounded-[8px] music-card-item cursor-pointer'>
        <img className='max-h-[182px] mb-[25px]' src={item.albumImg} alt="" width={"100%"} height={182}/>
        <h2 className='font-bold text-white text-[20px] line-clamp-1'>{item.albumName}</h2>
        <p className='font-semibold text-[#B3B3B3] text-[18px]'>{item.albumArtistName}</p>
    </div>
  )
}

export default MusicCard