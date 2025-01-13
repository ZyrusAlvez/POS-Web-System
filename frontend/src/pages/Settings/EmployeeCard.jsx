import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import { getUser } from "../../api/user";
import { toast, Toaster } from "sonner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetSales, updateName } from "../../api/user";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";

const EmployeeCard = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false)
  const { id } = useParams();
  const [newName, setNewName] = useState({
    surname: "",
    firstname: "",
    middleInitial: "",
  })

  console.log(user)

  useEffect(() => {
    getUser(id)
      .then((data) => setUser(data))
      .catch((error) => toast.error(error.message))
  }, [])

  function handleReset() {
    resetSales(id)
      .then(() => {
        getUser(id)
          .then((res) => setUser(res))
          .catch((error) => toast.error(error.message));
        toast.success("Sales reset")
      })
      .catch((error) => toast.error(error.message));
  }

  function handleUpdateName(){
    updateName(id, newName)
      .then((res) => {
        setUser(res.data)
        toast.success("Name Updated!")
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center">
        <Header />
        <Toaster richColors />
        <div className="flex flex-col rounded-[2rem] bg-primary w-[90%] gap-6 text-2xl p-4 ">
          <div className="flex justify-between">
            <h1 className="text-start">VIEW EMPLOYEE STATUS</h1>
            <div className="flex items-center justify-center rounded-lg bg-white w-[120px] cursor-pointer" onClick={() => setEditMode(!editMode)}>
              {
                !editMode ?  <div className="flex gap-2">
                              <FaCheck className="text-green-700"/>
                              <h1 className="text-sm">Edit Name</h1>
                            </div>
                         :  <div className="flex gap-2" onClick={handleUpdateName}>
                              <LuPencil className="text-blue-700"/>
                              <h1 className="text-sm">Save Name</h1>
                            </div>
              }
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-2 font-bold">
            <div className="text-5xl capitalize">
              {
                editMode ?  <div className="flex w-full items-end text-4xl">
                              <input className="rounded-lg w-[200px] outline-none" placeholder="Last Name" onChange={(e) => setNewName({...newName, surname: e.target.value})}/>
                              <h1>,</h1>
                              <input className="rounded-lg w-[200px] outline-none mx-2" placeholder="First Name" onChange={(e) => setNewName({...newName, firstname: e.target.value})}/>
                              <input className="rounded-lg w-[50px] outline-none" placeholder="MI" onChange={(e) => setNewName({...newName, middleInitial: e.target.value})}/>
                              <h1>.</h1>
                            </div>
                          : <>
                              <h1>{user?.fullname?.surname}, {user?.fullname?.firstname} {user?.fullname?.middleInitial}.</h1>
                            </>
              }

            </div>
            <h1>NAME</h1>
          </div>
          <div className="w-full rounded-full bg-white flex justify-between p-4">
            <h1 className="ml-4 text-base">CASH TOTAL SALES</h1>
            <h1 className="mr-4 text-5xl font-bold">₱ {user?.cashSales}</h1>
          </div>
          <div className="w-full rounded-full bg-white flex justify-between p-4">
            <h1 className="ml-4 text-base">ONLINE-PAYMENT TOTAL SALES</h1>
            <h1 className="mr-4 text-5xl font-bold">₱ {user?.gcashSales}</h1>
          </div>
          <div className="w-full flex justify-end">
            <Button style="p-2 px-8" onClick={handleReset}>
              RESET
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
