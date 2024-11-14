import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '../assets/icons'

function NavigateBtn() {
    const navigate = useNavigate()

    return (
        <div className='flex items-center space-x-[22px] py-5 px-10'>
            <button onClick={() => navigate(-1)} className='w-[40px] navigate-btn h-[40px] rounded-full justify-center items-center flex pr-[3px]'><ArrowBack /></button>
            <button onClick={() => navigate(+1)} className='w-[40px] navigate-btn h-[40px] rounded-full justify-center items-center flex rotate-[180deg] pr-[2px]'><ArrowBack /></button>
        </div>
    )
}

export default NavigateBtn