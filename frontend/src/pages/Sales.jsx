import SideBar from "../layout/SideBar"
import { getByDate } from "../api/sales"
import { useState, useEffect, useRef } from "react"
import { getDate } from "../utility/stringFunctions"
import React from "react"

const Sales = () => {
    const [data, setData] = useState([])
    const date = useRef(getDate())
    const total = useRef(0)
  
    useEffect(() => {
      getByDate(date.current)
        .then((res) => {
  
          // saves the fetch data to a state variable
          setData(res.data)
  
          // iterate through the data to make the final total from each transactions
          let subtotal = 0
          for(let e of res.data){
            subtotal += e.total
          }
  
          total.current = subtotal
        })
        .catch((err) => console.log(err))
    }, [])

    
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]"/>
      <div className="flex flex-col flex-grow items-center"> 
            <div className="w-[95%] mt-4 text-center">
              <h1 className="font-bold text-3xl mb-4">{date.current}</h1>
              <div className="grid grid-cols-[repeat(6,auto)]">
                <div className="bg-primary font-bold text-xl border-dark border-x-2 py-2">Order no.</div>
                <div className="bg-primary font-bold text-xl border-dark border-r-2 py-2">Items</div>
                <div className="bg-primary font-bold text-xl border-dark border-r-2 py-2">Total</div>
                <div className="bg-primary font-bold text-xl border-dark border-r-2 py-2">M.O.P.</div>
                <div className="bg-primary font-bold text-xl border-dark border-r-2 py-2">Ref. No.</div>
                <div className="bg-primary font-bold text-xl border-dark border-r-2 py-2">Time</div>
                {
                  data.map((e, i) => (
                    <React.Fragment key={i}>
                      <div className="bg-light font-bold text-xl border-dark border-x-2 flex items-center justify-center border-b-2">{i + 1}</div>
                      <div className="bg-light border-dark border-r-2 border-b-2 w-full">
                        {
                          e.billing.map((e, i) => (
                            <div key={i}>
                              <div className="flex items-center w-full justify-between">
                                <h1 className="text-start ml-4">{e.product.name}</h1>
                                <h2 className="mx-2 px-1 text-sm">{e.size}</h2>
                              </div>
                              
                              {
                                e.addOns.map((e, i) => (
                                  <h2 key={i} className="text-sm text-start ml-8">• {e.name}</h2>
                                ))
                              }
                            </div>
                          ))
                        }
                      </div>
                      <div className="bg-light border-dark border-r-2 border-b-2 flex items-center justify-center">₱ {e.total}</div>
                      <div className="bg-light border-dark border-r-2 border-b-2 flex items-center justify-center">{e.mop}</div>
                      <div className="bg-light border-dark border-r-2 border-b-2 flex items-center justify-center">{e.ref}</div>
                      <div className="bg-light border-dark border-r-2 border-b-2 flex items-center justify-center">{e.time}</div>
                    </React.Fragment>
                  )) 
                }
              </div>
              <h1 className="text-end text-xl mt-2"> Total Sales: <strong>₱ {total.current}</strong></h1>
            </div>
      </div>
    </div>
  )
}

export default Sales