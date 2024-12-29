import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import { toast, Toaster } from "sonner";
import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import { FaRegTrashCan } from "react-icons/fa6";
import AddIngredients from "../../components/Settings/AddIngredients";
import { addItem as addProductItem } from "../../api/product";
import { addItem as addOnItem } from "../../api/addOn";
import { title } from "../../utility/stringFunctions";

const AddProduct = () => {
  const initialForm = {
    name: "",
    category: "milktea",
    price_16oz: 0,
    price_22oz: 0,
    ingredients_16oz: {},
    ingredients_22oz: {},
  }

  const [form, setForm] = useState(initialForm)
  const [addOnsPrice, setAddOnsPrice] = useState(0);
  const [addOnsIngredients, setAddOnsIngredients] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cup16oz, setCup16oz] = useState(true);
  const [cup22oz, setCup22oz] = useState(true);
  const [addingIngredients, setAddingIngredients] = useState(false);
  
  // remove cup sizes when category is add_ons
  useEffect(() => {
    if (form.category === "add_ons") {
      setCup16oz(false);
      setCup22oz(false);
    }
  }, [form.category]);

  // transpose the array of selected ingredients to an object with initial serving count
  useEffect(() => {
    const tempIngredients = {};
    for(const key of selectedIngredients){
      console.log(key);
      if (!form.ingredients_16oz){
        tempIngredients[key] = 0;
      }
    }
    if (!tempIngredients){
      setForm({...form, ingredients_16oz: {...form.ingredients_16oz, tempIngredients}, ingredients_22oz: {...form.ingredients_22oz, tempIngredients}});
      setAddOnsIngredients(tempIngredients);
    }
  }, [selectedIngredients])

  function handleDeleteIngredient(ingredient) {
    setSelectedIngredients(selectedIngredients.filter((e) => e !== ingredient));
  }

  function handleAddProduct() {
    if (form.category !== "add_ons") {
      addProductItem({...form, name: title(form.name)})
        .then((res) => toast.success(res.message))
        .catch((err) => toast.error(err.message)); 
    }else{
      addOnItem({name: title(form.name), price: addOnsPrice, ingredients: addOnsIngredients})
        .then((res) => toast.success(res.message))
        .catch((err) => toast.error(err.message)); 
    }
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center relative">
        <Header title="Add Product" nav={!addingIngredients ? -1 : 0}/>
        <Toaster richColors />

        {!addingIngredients ? (
          <div className="w-[80%] bg-primary flex justify-center rounded-2xl">
            <div className="grid grid-cols-[auto,auto] gap-4 items-center m-8 text-lg font-bold text-end">
              <h1>Product Name : </h1>
              <input
                type="text"
                className="outline-none rounded-full w-[350px] py-1 px-4 text-lg ml-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <h1>Category : </h1>
              <select
                className="rounded-full py-1 px-4 text-lg w-[350px] outline-none font-normal ml-2"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="milktea">Milktea</option>
                <option value="frappuccino_cheesecake">
                  Frappuccino &#40;Cheesecake Series&#41;
                </option>
                <option value="frappuccino_coffee">
                  Frappuccino &#40;Coffee Series&#41;
                </option>
                <option value="frappuccino_non-coffee">
                  Frappuccino &#40;Non-Coffee Series&#41;
                </option>
                <option value="coffee">Coffee</option>
                <option value="coolers">Coolers</option>
                <option value="fruit_tea">Fruit Tea</option>
                <option value="add_ons">Add-Ons</option>
              </select>

              {form.category !== "add_ons" && (
                <>
                  <h1>Cup Sizes : </h1>
                  <div className="flex justify-start gap-2 ml-4">
                    <input
                      type="checkbox"
                      id="16oz"
                      name="16oz"
                      className="w-5"
                      onChange={() => setCup16oz((c) => !c)}
                      checked={cup16oz}
                    />
                    <label htmlFor="16oz" className="mr-4">
                      16oz
                    </label>
                    <input
                      type="checkbox"
                      id="22oz"
                      name="22oz"
                      className="w-5"
                      onChange={() => setCup22oz((c) => !c)}
                      checked={cup22oz}
                    />
                    <label htmlFor="22oz">22oz</label>
                  </div>
                </>
              )}

              <h1>Price : </h1>
              <div className="flex">
                {/* conditional rendering based on category and cup sizes */}
                {form.category === "add_ons" && (<input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2" value={addOnsPrice} onChange={(e) => e.target.value > -1 && setAddOnsPrice(Number(e.target.value))}/>)}
                {form.category !== "add_ons" && cup16oz && (<input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2" placeholder="16oz" value={form.price_16oz || ""} onChange={(e) => e.target.value > -1 && setForm({...form, price_16oz : Number(e.target.value)})}/>)}
                {form.category !== "add_ons" && cup22oz && (<input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2" placeholder="22oz" value={form.price_22oz || ""} onChange={(e) => e.target.value > -1 && setForm({...form, price_22oz : Number(e.target.value)})}/>)}
              </div>

              <div className="flex h-full text-end justify-end">
                <h1 className="">Ingredients: </h1>
              </div>

              <div className="ml-2 grid grid-cols-[auto,auto,auto] justify-start items-center font-normal">
                {selectedIngredients.length !== 0 && (
                  <>
                    <h1 className="text-center border-r-2 border-b-2 border-dark px-2 font-bold">
                      Name
                    </h1>
                    <h1 className="text-center border-b-2 border-dark px-2 font-bold">
                      Serving count
                    </h1>
                    <h1></h1>
                  </>
                )}
                {selectedIngredients.map((ingredient, i) => (
                  <React.Fragment key={i}>
                    <h1 className="text-start border-r-2 border-dark px-2 py-1">
                      {ingredient}
                    </h1>
                    <div className=" border-dark flex justify-center gap-2 mx-2">
                      {/* conditional rendering based on category and cup sizes */}
                      {form.category !== "add_ons" && cup16oz && (
                        <input
                          className="outline-none rounded-full pl-2 w-[80px]"
                          placeholder="16oz"
                          onChange={(e) => e.target.value > -1 && setForm({...form, ingredients_16oz : {...form.ingredients_16oz, [ingredient] : Number(e.target.value)}})}
                          value={form.ingredients_16oz[ingredient] || ""}
                        />
                      )}
                      {form.category !== "add_ons" && cup22oz && (
                        <input
                          className="outline-none rounded-full pl-2 w-[80px]"
                          placeholder="22oz"
                          onChange={(e) => e.target.value > -1 && setForm({...form, ingredients_22oz : {...form.ingredients_22oz, [ingredient] : Number(e.target.value)}})}
                          value={form.ingredients_22oz[ingredient] || ""}
                        />
                      )}
                      {form.category === "add_ons" && (
                        <input 
                          className="outline-none rounded-full pl-2 w-[80px]"
                          onChange={(e) => e.target.value > -1 && setAddOnsIngredients({...addOnsIngredients, [ingredient] : Number(e.target.value)})}
                          value={addOnsIngredients[ingredient]}
                        />
                      )}
                    </div>
                    <FaRegTrashCan
                      className="text-red-600 text-xl cursor-pointer ml-2"
                      onClick={() => handleDeleteIngredient(ingredient)}
                    />
                  </ React.Fragment>
                ))}
                <Button
                  style="px-4 py-2 text-base mt-4 col-span-2"
                  onClick={() => setAddingIngredients(true)}
                >
                  Add Ingredients
                </Button>

                <Button style="fixed bottom-0 right-0 px-10 py-2 font-bold mr-4 mb-4" onClick={() => handleAddProduct()}>Create Product</Button>
              </div>
            </div>
          </div>
        ) : (
          <AddIngredients
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
            setAddingIngredients={setAddingIngredients}
          />
        )}
      </div>
    </div>
  );
};

export default AddProduct;