import { getByDate } from "../../api/sales/history"
import { useState, useEffect, useRef } from "react"
import { dateToday } from "../../utility/stringFunctions"
import React from "react"

const History = () => {
  const [data, setData] = useState([])
  const date = useRef(dateToday())

  useEffect(() => {
    getByDate(date.current)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="w-[95%] mt-8 text-center">
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
              <div className="bg-light border-dark border-r-2 border-b-2">
                {
                  e.billing.map((e, i) => (
                    <div key={i}>
                      <h1 className="text-start ml-4">{e.product.name}</h1>
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
    </div>
  )
}

export default History