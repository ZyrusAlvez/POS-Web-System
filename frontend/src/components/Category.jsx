import React from 'react'

const Category = ({category, setCategory}) => {
  return (
    <div className='flex gap-4 font-bold flex-wrap justify-center'>
      <div className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${category === 'milktea' ? 'shadow-hard' : ''}`} onClick={() => setCategory('milktea')}>Milk Tea</div>
      <div className='flex flex-col w-auto p-4 bg-primary rounded-xl items-center cursor-pointer'>
        <h1>Cheesecake</h1>
        <h1 className='text-sm'>Frappucino</h1>
      </div>
      <div className='flex flex-col w-auto p-4 bg-primary rounded-xl items-center cursor-pointer'>
        <h1>Coffee</h1>
        <h1 className='text-sm'>Frappucino</h1>
      </div>
      <div className='flex flex-col w-auto p-4 bg-primary rounded-xl items-center cursor-pointer'>
        <h1>Non-Coffee</h1>
        <h1 className='text-sm'>Frappucino</h1>
      </div>
      <div className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${category === 'coffee' ? 'shadow-hard' : ''}`} onClick={() => setCategory('coffee')}>Coffee</div>
      <div className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${category === 'coolers' ? 'shadow-hard' : ''}`} onClick={() => setCategory('coolers')}>Coolers</div>
      <div className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${category === 'fruit_tea' ? 'shadow-hard' : ''}`} onClick={() => setCategory('fruit_tea')}>Fruit Tea</div>
      <div className={`w-auto p-4 bg-primary rounded-xl flex items-center cursor-pointer ${category === 'add_ons' ? 'shadow-hard' : ''}`} onClick={() => setCategory('add_ons')}>Add Ons</div>
    </div>
  )
}

export default Category