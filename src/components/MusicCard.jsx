import React from 'react'

function MusicCard({item}) {
  return (
    <div className='min-w-[224px] p-5 rounded-[8px] music-card-item'>
        <img className='max-h-[182px] mb-[25px]' src={item.albumImg} alt="" width={"100%"} height={182}/>
        <h2 className='font-bold text-white text-[20px] line-clamp-1'>{item.albumName}</h2>
        <p className='font-semibold text-[#B3B3B3] text-[18px]'>{item.albumArtistName}</p>
    </div>
  )
}

export default MusicCard