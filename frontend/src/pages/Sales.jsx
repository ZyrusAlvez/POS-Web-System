import SideBar from "../layout/SideBar"
import History from "../components/Sales/History"
import { useState } from "react"

const Sales = () => {
  const [category, setCategory] = useState("history")

  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]"/>
      <div className="flex flex-col flex-grow items-center"> 
        <div className="flex w-full justify-center items-center gap-16 mt-4">
          <h1 className={`p-4 bg-primary rounded-full font-bold ${category === "history" && "shadow-hard"}`} onClick={() => setCategory("history")}>Sales History</h1>
          <h1 className={`p-4 bg-primary rounded-full font-bold ${category === "count" && "shadow-hard"}`} onClick={() => setCategory("count")}>Sales Count</h1>
        </div>
        <History />
      </div>
    </div>
  )
}

export default Sales