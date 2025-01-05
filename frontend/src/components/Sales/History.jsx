import { getByDate } from "../../api/sales/history"
import { useState, useEffect } from "react"

const History = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    const now = new Date

    const date = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    getByDate(date)
      .then((res) => setData(res))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>History</div>
  )
}

export default History