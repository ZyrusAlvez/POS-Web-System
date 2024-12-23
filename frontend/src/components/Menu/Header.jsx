import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";

const Header = ({setCategory}) => {
  const [categoryClicked, setCategoryClicked] = useState(false)
  const [frappucino, setFrappucino] = useState(false)

  return (
    <div className="flex justify-between p-8 items-center bg-white relative z-10">
      <h1 className="text-5xl font-bold">Menu</h1>
      <div className="flex bg-primary gap-2 relative">
        <div className="flex items-center justify-center gap-2 h-[40px] w-[170px] cursor-pointer" onClick={() => setCategoryClicked((c) => !c)}>
          <h1 className="font-bold text-xl">Category</h1>
          <TiArrowSortedDown className={`text-3xl transition-transform duration-300 ${categoryClicked ? 'rotate-0' : '-rotate-90'}`}/>
        </div>

        <div className={`absolute w-[170px] top-0 translate-y-10 text-sm font-bold cursor-pointer ${categoryClicked ? 'block' : 'hidden'}`}>
          <div className="p-2 border-x-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("milktea"); setCategoryClicked(false)}}>Milktea</div>
          <div className={`p-2 border-x-2 border-y-[1px] border-primary text-center relative ${frappucino ? 'bg-primary text-light' : 'bg-light text-black'}`} onClick={() => setFrappucino((f) => !f)}>
            <h1>Frappucino</h1>
            <div className={`absolute w-[170px] translate-x-40 -top-0 text-black ${frappucino ? 'block' : 'hidden'}`}>
              <div className="p-2 border-r-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("frappuccino_cheesecake"); setCategoryClicked(false)}}>Cheesecake Series</div>
              <div className="p-2 border-r-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("frappuccino_coffee"); setCategoryClicked(false)}}>Coffee Series</div>
              <div className="p-2 border-r-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("frappuccino_non-coffee"); setCategoryClicked(false)}}>Non-Coffee Series</div>
            </div>
          </div>
          <div className="p-2 border-x-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("coffee"); setCategoryClicked(false)}}>Coffee</div>
          <div className="p-2 border-x-2 border-y-[1px] border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("coolers"); setCategoryClicked(false)}}>Coolers</div>
          <div className="p-2 border-x-2 border-y-[1px] border-b-2 border-primary bg-light text-center active:bg-primary active:text-light" onClick={() => {setCategory("fruit_tea"); setCategoryClicked(false)}}>Fruit Tea</div>
        </div>
      </div>
    </div>
  )
}

export default Header