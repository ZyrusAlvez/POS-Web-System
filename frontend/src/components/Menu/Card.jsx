import React from 'react'

const Card = ({name}) => {
  return (
    <div className='w-[90%] h-[250px] bg-light rounded-2xl flex items-center'>
      <div className="w-[40%] h-full">
        <h1>{name}</h1>
      </div>
      <div className='flex-1 h-[80%] border-l-2 border-primary'></div>
    </div>
  )
}

export default Card