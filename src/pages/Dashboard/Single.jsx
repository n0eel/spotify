import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { CLIENT_ID } from '../../hook/useEnv'
import { Context } from '../../context/Context'
import NavigateBtn from '../../components/NavigateBtn'
import { ArrowDownIcon, DownloadIcon, HeartIcon, MoreIcon, PlayIcon, SingleLikeIcon, SingleSearchIcon, WatchIcon } from '../../assets/icons'

function Single() {
  const { id } = useParams()
  const { accessToken, setPlay, setPlaying } = useContext(Context)
  const [singleMusic, setSingleMusic] = useState([])

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken, singleMusic])

  useEffect(() => {
    if (accessToken) {
      spotifyApi.getAlbums(id).then(res => {
        setSingleMusic(res.body)
      })
    }
  }, [accessToken, id])

const [artistMusic, setArtistMusic] = useState([])
  useEffect(() => {
    if (accessToken && singleMusic.name) {
      spotifyApi.searchTracks(singleMusic?.artists[0]?.name).then(res => {
        setArtistMusic(res.body.tracks.items.map(item => {
          const data = {
            id: item.id,
            img: item.album.images[0].url,
            trackName: item.name,
            artistName: item.artists[0].name,
            date: item.album.release_date,
            uri: item.uri
          }
        }))
      })
    }
  }, [accessToken, singleMusic])

  function handlePlayMusic(uri) {
    setPlay(uri)
    setPlaying(true)
  }

  return (
    <div className='h-auto single-page'>
      <NavigateBtn extraStyle={'bg-[#DDF628]'} />
      <div className='flex space-x-[32px] px-[41px] py-[26px] mb-[21px]'>
        {singleMusic?.images && <img className='w-[287px] h-[287px]' src={singleMusic?.images[0]?.url} alt="" width={287} height={287} />}
        <div>
          <p className='text-[18px] text-white leading-[20px] uppercase'>{singleMusic.label}</p>
          <h2 className='text-[90px] text-white font-bold mb-[12px]'>{singleMusic.name}</h2>
          {singleMusic?.artists && <p className='text-[20px] text-white mb-[12px]'>{singleMusic?.artists[0]?.name}</p>}
          <p className='text-[20px] text-white'>{singleMusic.release_date}</p>
        </div>
      </div>
      <div className='flex items-center justify-between text-white px-[41px]'>
        <div className='flex items-center space-x-[25px] text-white'>
          <button className='w-[72px] h-[72px] bg-[#65D36E] rounded-full flex items-center justify-center'><PlayIcon /></button>
          <button><SingleLikeIcon /></button>
          <button><DownloadIcon /></button>
          <button><MoreIcon /></button>
        </div>
        <div className='flex items-center space-x-[45px]'>
          <button><SingleSearchIcon /></button>
          <div className='flex items-center space-x-[14px] text-white'>
            <span className='text-[18px] leading-[22px]'>Custom order</span>
            <button><ArrowDownIcon /></button>
          </div>
        </div>
      </div>
      <div className='px-[41px'>
      <table className='w-full mt-[30px]'>
        <thead>
          <tr>
            <th className='py-[14px border-b-[1px] border-[#666666] text-[#666666] text-[15px]'>#</th>
            <th className='pl-5 py-[14px text-start border-b-[1px] border-[#666666] text-[#666666] text-[15px]'>TITLE</th>
            <th className='py-[14px text-start border-b-[1px] border-[#666666] text-[#666666] text-[15px]'>ALBUM</th>
            <th className='py-[14px border-b-[1px] border-[#666666] text-[#666666] text-[15px]'>DATE ADDED</th>
            <th className='py-[14px text-end border-b-[1px] border-[#666666] text-[#666666] text-[15px]'><WatchIcon/></th>
          </tr>
        </thead>
        <tbody>
            {artistMusic.map((item, index) => {
              <tr onClick={() => handlePlayMusic(item.uri)}  className='cursor-pointer'>
                <td className='text-white text-[22px] py-[10px] cursor-pointer'>{index + 1}</td>
                <td className='py-[10px] pl-5 cursor-pointer'>
                  <div className='flex items-center space-x-[21px]'>
                    <img className='w-[52px] h-[52px]' src={item.img} alt="" width={52} height={52}/>
                    <div>
                      <h2 className='text-[20px] text-white font-normal mb-[2px] line-clamp-1'>{item.trackName}</h2>
                      <p className='text-[18px] text-[#B3B3B3]'>{item.artistName}</p>
                    </div>
                  </div>
                </td>
                <td className='text-[#B3B3B3]  text-[16px] py-[10px] cursor-pointer'>{item.name}</td>
                <td className='text-white text-[16px] py-[10px] cursor-pointer'>{item.date}</td>
                <td className='text-white text-[20px] py-[10px] cursor-pointer'>
                  <div className='flex items-center space-x-[37px] justify-end'>
                    <HeartIcon/>
                    <span>3:13</span>
                  </div>
                </td>
              </tr> 
            })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Single