import React from 'react'
import { PATH } from '../hook/usePath'
import { CreateIcon, HomeActiveIcon, HomeIcon, LibIcon, LikedIcon, SearchIcon } from '../assets/icons'
import NavbarItem from './NavbarItem'
import { useLocation } from 'react-router-dom'

function Navbar() {
    const {pathname} = useLocation()

  return (
    <div className='w-[19%] pt-[70px] pl-[30px] h-[100vh] bg-black overflow-y-auto'>
        <NavbarItem extraStyle={"mb-[20px]"} icon={pathname == "/" ? <HomeActiveIcon/> : <HomeIcon/>} title={"Home"} path={PATH.home}/>
        <NavbarItem extraStyle={"mb-[20px]"} icon={<SearchIcon/>} title={"Search"} path={PATH.search}/>
        <NavbarItem extraStyle={"!opacity-[0.6] mb-[49px]"} icon={<LibIcon/>} title={"Your Library"} path={"#"}/>
        <NavbarItem extraStyle={"!opacity-[0.6] mb-[20px]"} icon={<CreateIcon/>} title={"Create Playlist"} path={"#"}/>
        <NavbarItem extraStyle={"!opacity-[1]"} icon={<LikedIcon/>} title={"Liked Songs"} path={PATH.like}/>
    </div>
  )
}

export default Navbar