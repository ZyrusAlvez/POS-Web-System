import SideBar from "../../layout/SideBar";
import Header from "../../components/Header";
import { toast, Toaster } from "sonner";
import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";

const AddProduct = ({selectedIngredients, setSelectedIngredients}) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("milktea");
  const [cup16oz, setCup16oz] = useState(false);
  const [cup22oz, setCup22oz] = useState(false);

  useEffect(()=> {
    if(category === "add_ons"){
      setCup16oz(false);
      setCup22oz(false);
    }
  }, [category])

  function handleDeleteIngredient(ingredient){
    setSelectedIngredients(selectedIngredients.filter((e) => e !== ingredient));
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="w-[15vw] min-w-[150px]" />
      <div className="flex flex-col flex-grow items-center ">
        <Header />
        <Toaster richColors />

        <div className="w-[80%] bg-primary flex justify-center rounded-2xl">
          <div className="grid grid-cols-[auto,auto] gap-4 items-center m-8 text-lg font-bold text-end">
            
            <h1>Product Name : </h1>
            <input type="text" className="outline-none rounded-full w-[350px] py-1 px-4 text-lg ml-2"/>
            
            <h1>Category : </h1>
            <select className="rounded-full py-1 px-4 text-lg w-[350px] outline-none font-normal ml-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="milktea">Milktea</option>
              <option value="frappuccino_cheesecake">Frappuccino &#40;Cheesecake Series&#41;</option>
              <option value="frappuccino_coffee">Frappuccino &#40;Coffee Series&#41;</option>
              <option value="frappuccino_non-coffee">Frappuccino &#40;Non-Coffee Series&#41;</option>
              <option value="coffee">Coffee</option>
              <option value="coolers">Coolers</option>
              <option value="fruit_tea">Fruit Tea</option>
              <option value="add_ons">Add-Ons</option>
            </select>

            {category !== "add_ons" && (
              <>
                <h1>Cup Sizes : </h1>
                <div className="flex justify-start gap-2 ml-4">
                  <input type="checkbox" id="16oz" name="16oz" className="w-5" onClick={() => setCup16oz((c) => !c)} checked={cup16oz}/>
                  <label for="16oz" className="mr-4">16oz</label>
                  <input type="checkbox" id="22oz" name="22oz" className="w-5" onClick={() => setCup22oz((c) => !c)} checked={cup22oz}/>
                  <label for="22oz">22oz</label>
                </div>
              </>
            )}

            {/* conditional rendering for price input */}
            <h1>Price : </h1>
            <div className="flex">
              { 
                !cup16oz && !cup22oz ?
                  <input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2"/>
                : <div/>
              }             
              {
                cup16oz ?
                  <input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2" placeholder="16oz"/>
                : <div/>
              }
              {
                cup22oz ?
                  <input className="outline-none rounded-full w-[150px] py-1 px-4 text-lg ml-2" placeholder="22oz"/>
                : <div/>
              }
            </div>
            
            <div className="flex h-full text-end justify-end">
              <h1 className="">Ingredients: </h1>
            </div>
            
            <div className="ml-2 grid grid-cols-[auto,auto,auto] justify-start items-center font-normal">

              {
                selectedIngredients.length !== 0 &&
                <>
                  <h1 className="text-center border-r-2 border-b-2 border-dark px-2 font-bold">Name</h1>
                  <h1 className="text-center border-b-2 border-dark px-2 font-bold">Serving count</h1>
                  <h1></h1>

                </>
              }
              {selectedIngredients.map((ingredient) => (
                <>
                  <h1 className="text-start border-r-2 border-dark px-2 py-1">{ingredient}</h1>
                  <div className=" border-dark flex justify-center">
                    <input className="outline-none rounded-full pl-2 w-[80px]"/>
                  </div>
                  <FaRegTrashCan 
                    className="text-red-600 text-xl cursor-pointer ml-2"
                    onClick={() => handleDeleteIngredient(ingredient)}
                  />
                </>
              ))}
              <Button style='px-4 py-2 text-base mt-4 col-span-2' onClick={() => navigate("./add-ingredients")}>Add Ingredients</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;