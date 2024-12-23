import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Card from './Card.jsx'
import { getItemByCategory } from '../../api/product.js'

const Main = ({billing, setBilling}) => {
  const [laoding, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState("milktea")

  useEffect(() => {
    getItemByCategory(category)
      .then((res) => {setProducts(res.data); setLoading(false)})
      .catch((error) => console.log(error))
  }, [category, setCategory])

  return (
    <div className="flex-grow">
      <Header setCategory={setCategory}/>

      {laoding && <h1 className='w-full h-full text-3xl text-center'>Loading...</h1>} 

      <div className='flex flex-col w-full items-center gap-8'>
        {
          products.map((e, i) => <Card key={i} product={e} setBilling={setBilling} billing={billing}/>)
        }
      </div>

    </div>
  )
}

export default Main