import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import InputPassword from "../../components/ui/InputPassword";
import { useState } from "react";
import { addUser } from "../../api/user";
import { toast, Toaster } from "sonner";

const AddEmployee = () => {
  const initialCredentials = {
    username: "",
    password: "",
    sales: 0,
    fullname: {
      surname: "",
      firstname: "",
      middleInitial: "",
    },
  };

  const [credentials, setCredentials] = useState(initialCredentials);
  const [confirmation, setConfirmation] = useState("");

  function handleSubmit() {
    if (Object.values(credentials).some((e) => e === "")) {
      toast.error("Please fill out all fields");
      return;
    }

    if (confirmation === credentials.password) {
      addUser(credentials)
        .then((res) => toast.success(res.message))
        .catch((err) => toast.error(err.message));

      // reset input fields
      setCredentials(initialCredentials);
      setConfirmation("");
    } else {
      toast.error("Passwords do not match");
    }
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header />
        <Toaster richColors />

        <div className="w-[90%] h-auto p-4 pb-8 bg-primary rounded-2xl font-bold text-xl text-center flex flex-col gap-4">
          <h1>ADD EMPLOYEE</h1>
          <div className="flex gap-4 mt-4 justify-center">
            <h1>Full Name:</h1>
            <input
              placeholder="Surname"
              className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"
              value={credentials.fullname.surname}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  fullname: {
                    ...credentials.fullname,
                    surname: e.target.value,
                  },
                })
              }
            />
            <input
              placeholder="First Name"
              className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"
              value={credentials.fullname.firstname}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  fullname: {
                    ...credentials.fullname,
                    firstname: e.target.value,
                  },
                })
              }
            />
            <input
              placeholder="M.I."
              className="outline-none rounded-full w-[100px] py-1 px-4 text-lg"
              value={credentials.fullname.middleInitial}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  fullname: {
                    ...credentials.fullname,
                    middleInitial: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-y-4">
            <h1 className="text-end mr-12">Username: </h1>
            <input
              className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <h1 className="text-end mr-12">Set Password: </h1>
            <InputPassword
              style="w-[250px]"
              start={true}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              value={credentials.password}
            />
            <h1 className="text-end mr-12">Confirm Password: </h1>
            <InputPassword
              style="w-[250px]"
              start={true}
              onChange={(e) => setConfirmation(e.target.value)}
              value={confirmation}
            />
          </div>

          <div className="w-full flex justify-center mt-8">
            <Button style="w-[20%] min-w-[150px] py-2" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
