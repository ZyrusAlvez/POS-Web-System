import SideBar from "../../layout/SideBar.jsx";
import Main from "../../components/Menu/Main.jsx";
import Transaction from "../../components/Menu/Transaction.jsx";
import { useState } from "react";
import Cash from "../../components/Menu/Pop-Up/Cash.jsx";
import Gcash from "../../components/Menu/Pop-Up/Gcash.jsx";
const Menu = () => {
  const [billing, setBilling] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [submit, setSubmit] = useState(false)
  const [total, setTotal] = useState(0)

  return (
    // div was used to imitate the width of the position:fixed component
    <>
      {paymentMethod === "cash" && submit && <Cash submit={submit} setSubmit={setSubmit} total={total} billing={billing} setBilling={setBilling}/>}
      {paymentMethod === "gcash" && submit && <Gcash submit={submit} setSubmit={setSubmit} total={total} billing={billing} setBilling={setBilling}/>}

      <div className="flex justify-between">
        <SideBar/>
        <div className="w-[15vw] min-w-[150px]"/>

        <Main billing={billing} setBilling={setBilling}/>

        <Transaction billing={billing} setBilling={setBilling} setSubmit={setSubmit} total={total} setTotal={setTotal} setPaymentMethod={setPaymentMethod}/>
        <div className="w-[25vw] min-w-[200px]"/>
      </div>
    </>
  )
}

export default Menu