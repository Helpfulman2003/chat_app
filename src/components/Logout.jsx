import React from 'react'
import { CiLogout } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from "../redux/userSlice"

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logout())
        navigate("/login")
    }

  return (
    <div onClick={handleClick} className='flex justify-center items-center p-[0.5rem] rounded-[0.5rem] bg-[#9a86f3] cursor-pointer'>
        <CiLogout color='#ebe7ff' size={'1.3rem'}/>
    </div>
  )
}

export default Logout