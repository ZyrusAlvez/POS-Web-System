import SideBar from "../layout/SideBar"
import History from "../components/Sales/History"

const Sales = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]"/>
      <History />
    </div>
  )
}

export default Sales