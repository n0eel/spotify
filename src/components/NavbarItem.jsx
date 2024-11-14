import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarItem({icon, path, title, extraStyle}) {
    return (
        <NavLink className={`text-white opacity-[0.6] flex items-center gap-5 ${extraStyle}`} to={path}>
            {icon}
            <strong className='text-[18px] font-bold'>{title}</strong>
        </NavLink>
    )
}

export default NavbarItem