import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import { addItem } from "../../api/inventory";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { capitalize } from "../../utility/stringFunctions";

const AddItem = () => {
  const initialForm = {
    name: "",
    amount: 10,
    category: "Flavors",
    denominator: 66,
    unit: "Pack",
  };

  const [form, setForm] = useState(initialForm);

  function handleClick() {
    let newCategory = form.category.toLowerCase();
    if (newCategory === "fruit tea") {
      newCategory = "fruit_tea";
    }

    addItem({ ...form, category: newCategory, name: capitalize(form.name) })
      .then((res) => {
        toast.success(res.message);
        setForm(initialForm);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  }

  useEffect(() => {
    if (form.unit === "Pack") {
      setForm({ ...form, denominator: 66 });
    } else {
    }
  }, [form.unit]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center">
        <Header title="Add Item" />
        <Toaster richColors />
        <div className="grid grid-cols-[auto,auto] gap-4 w-[80%] bg-primary p-8 mt-16 rounded-2xl items-center text-lg font-bold justify-center">
          <h1 className="text-end">Item Name :</h1>
          <input
            className="outline-none rounded-full w-[250px] py-1 px-4 text-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />

          <h1 className="text-end">Category :</h1>
          <select
            className="outline-none py-1 px-4 text-lg w-[150px] rounded-full font-normal"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            value={form.category}
          >
            <option>Flavors</option>
            <option>Products</option>
            <option>Materials</option>
            <option>Fruit Tea</option>
          </select>

          <h1 className="text-end items-center">Quatity :</h1>
          <div className="flex gap-4 items-center">
            <input
              className=" rounded-full py-1 px-4 text-lg w-[150px] outline-none"
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
              value={form.amount}
            />
            <h1>Unit: </h1>
            <select
              className="rounded-full py-1 px-4 text-lg w-[100px] outline-none font-normal"
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              value={form.unit}
            >
              <option>Pack</option>
              <option>Sack</option>
              <option>Jar</option>
              <option>Gallon</option>
              <option>200 ML</option>
              <option>Piece</option>
            </select>
          </div>

          <h1>Serving per Unit :</h1>
          <input
            className="rounded-full py-1 px-4 text-lg w-[250px] outline-none"
            onChange={(e) =>
              setForm({ ...form, denominator: Number(e.target.value) })
            }
            value={form.denominator}
          />
        </div>

        <Button style="px-16 py-2 text-lg mt-4" onClick={() => handleClick()}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddItem;
