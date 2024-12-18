import { useEffect, useState } from "react";
import { addItem, getItemByClassification } from "../api/inventory";

const Inventory = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [classification, setClassification] = useState("testing");
  const [items, setItems] = useState([]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAmount(e) {
    setAmount(e.target.value);
  }
  function handleChangeClassification(e) {
    setClassification(e.target.value);
  }

  function handleSubmit() {
    addItem(name, amount, classification)
      .then((result) => alert(result.data.name))
      .catch((error) => alert(error.message));
  }

  useEffect(() => {
    getItemByClassification("testing")
      .then((result) => setItems(result.data))
      .catch((error) => console.log(error));
  }, [handleSubmit]);

  return (
    <div className="flex flex-col">
      <input placeholder="Name" onChange={(e) => handleChangeName(e)} />
      <input
        placeholder="Amount"
        type="number"
        onChange={(e) => handleChangeAmount(e)}
      />
      <input
        placeholder="Classification"
        onChange={(e) => handleChangeClassification(e)}
      />
      <button className="border-2" onClick={handleSubmit}>
        Submit
      </button>

      <div className="border-2 border-black">
        {items.map((e, i) => {
          return <h1 key={i}>{e.name}</h1>;
        })}
      </div>
    </div>
  );
};

export default Inventory;
