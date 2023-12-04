import React from 'react'
import { useSelector } from 'react-redux';
import Robot from "../assets/robot.gif"

const Welcome = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div  className='flex justify-center items-center flex-col text-white flex-1'>
      <img src={Robot} alt="" className='h-[20rem]'/>
      <h1>Welcome, <span className='text-[#4e00ff]'>{user?.username}</span></h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  )
}

export default Welcome