import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Card from './Card.jsx'
import { getItemByCategory } from '../../api/product.js'

const Main = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getItemByCategory("milktea")
      .then((res) => setProducts(res.data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="flex-grow">
      <Header />
      <div className='flex flex-col w-full items-center gap-8'>
        {
          products.map((e, i) => <Card key={i} product={e}/>)
        }
      </div>
    </div>
  )
}

export default Main