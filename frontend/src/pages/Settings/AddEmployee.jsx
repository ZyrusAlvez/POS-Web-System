import SideBar from "../../layout/SideBar"
import Header from "../../components/Settings/Header"
import Button from "../../components/ui/Button"
import InputPassword from "../../components/ui/InputPassword"

const AddEmployee = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header/>

        <div className="w-[90%] h-auto p-4 pb-8 bg-primary rounded-2xl font-bold text-xl text-center flex flex-col gap-4">
          <h1>ADD EMPLOYEE</h1>
          <div className="flex gap-4 mt-4 justify-center">
            <h1>Full Name:</h1>
            <input placeholder="Surname" className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"/>
            <input placeholder="First Name" className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"/>            
            <input placeholder="M.I." className="outline-none rounded-full w-[100px] py-1 px-4 text-lg"/>
          </div>

          <div className="grid grid-cols-2 gap-y-4">
            <h1 className="text-end mr-12">Username: </h1>
            <input className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"/>
            <h1 className="text-end mr-12">Set Password: </h1>
            <InputPassword style='w-[250px]' start={true}/>
            <h1 className="text-end mr-12">Confirm Password: </h1>
            <InputPassword style='w-[250px]' start={true}/>
          </div>

          <div className="w-full flex justify-center mt-8">
            <Button style='w-[20%] min-w-[150px] py-2'>Submit</Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AddEmployee