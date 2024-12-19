import { TiArrowSortedDown } from "react-icons/ti";

const Header = () => {
  return (
    <div className="flex justify-between p-8 items-center bg-white">
      <h1 className="text-5xl font-bold">Menu</h1>
      <div className="flex bg-primary h-[35px] w-[130px] justify-center items-center gap-2">
        <h1 className="font-bold text-xl">Category</h1>
        <TiArrowSortedDown className="text-3xl"/>
      </div>
    </div>
  )
}

export default Header