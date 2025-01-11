import { useEffect, useRef, useState } from 'react';
import { PiPlusCircleFill, PiMinusCircleFill } from 'react-icons/pi';
import { getAllItems } from '../../api/addOn';

const Card = ({ product, setBilling, billing }) => {
  const [price, setPrice] = useState(product.price_16oz);
  const [quantity, setQuantity] = useState(1);
  const [radbtn, setRadbtn] = useState('16oz');
  const [addOns, setAddOns] = useState([]);
  const [addOnsList, setAddOnsList] = useState([]);
  const cupPrice = useRef(product.price_16oz);

  function updatePrice(newQuantity, newAddOns) {
    const addOnsPrice = newAddOns.reduce((acc, curr) => acc + curr.price, 0);
    setPrice((cupPrice.current + addOnsPrice) * newQuantity);
  }


  // Reset price and quantity when product/category changes
  useEffect(() => {
    if (!product.price_16oz) {
      setPrice(product.price_22oz);
      setRadbtn('22oz');
      cupPrice.current = product.price_22oz;
    } else {
      setPrice(product.price_16oz);
      setRadbtn('16oz');
      cupPrice.current = product.price_16oz;
    }
    setQuantity(1);
    setAddOns([]);
  }, [product, billing]);

  useEffect(() => {
    getAllItems()
      .then((res) => setAddOnsList(res.data))
      .catch((error) => console.log(error));
  }, []);

  function handleQuantity(variant) {
    let newQuantity = quantity;
    if (variant === 'minus' && quantity > 1) {
      newQuantity = quantity - 1;
    }
    if (variant === 'add') {
      newQuantity = quantity + 1;
    }
    setQuantity(newQuantity);
    updatePrice(newQuantity, addOns);
  }

  function handleAdd() {
    setBilling((prev) => [...prev, { product: product, quantity: quantity, price: price, addOns: addOns, size: radbtn }]);
  }


  function handleChange(e) {
    // prevent negative quantity and letters
    if (e.target.value > -1) {
      const newQuantity = Number(e.target.value);
      setQuantity(newQuantity);
      updatePrice(newQuantity, addOns);
    }
  }

  function toggleAddOn(addOn) {
    setAddOns((prevAddOns) => {
      const newAddOns = prevAddOns.includes(addOn)
        ? prevAddOns.filter((a) => a !== addOn)
        : [...prevAddOns, addOn];
      updatePrice(quantity, newAddOns);
      return newAddOns;
    });
  }

  function handleSizeChange(size) {
    setRadbtn(size);
    cupPrice.current = size === '16oz' ? product.price_16oz : product.price_22oz;
    updatePrice(quantity, addOns);
  }


  return (
    <div className="w-[90%] min-h-[250px] bg-light rounded-2xl flex items-center font-bold p-2">
      <div className="w-[40%] h-full flex flex-col gap-6">
        <div className="flex flex-col justify-start text-xl -gap-1 ml-[16%]">
          <h1>{product.name}</h1>
          <h1>₱ {price}</h1>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className="flex gap-2">
            <PiMinusCircleFill
              onClick={() => handleQuantity('minus')}
              className="text-4xl cursor-pointer active:text-primary"
            />
            <input
              className="outline-none w-20 rounded-md text-center text-xl bg-[#D9D9D9]"
              value={quantity}
              onChange={(e) => handleChange(e)}
            />
            <PiPlusCircleFill
              onClick={() => handleQuantity('add')}
              className="text-4xl cursor-pointer active:text-primary"
            />
          </div>
          <button
            className="rounded-full w-32 bg-primary h-8 text-sm active:bg-dark active:text-light"
            onClick={handleAdd}
          >
            ADD
          </button>
        </div>
      </div>

      <div className='border-l-2 border-primary min-h-[200px] rounded-full'/>

      <div className="flex flex-col ml-4 text-lg">
        <h1>Size</h1>
        <div className="flex gap-4 mt-2">
          <button
            className={`w-10 h-10 rounded-full text-black text-sm ${
              radbtn === '16oz' ? 'bg-primary' : 'bg-white'
            } ${product.price_16oz ? 'block' : 'hidden'}`}
            onClick={() => handleSizeChange('16oz')}
          >
            16oz
          </button>
          <button
            className={`w-10 h-10 rounded-full text-black text-sm ${
              radbtn === '22oz' ? 'bg-primary' : 'bg-white'
            } ${product.price_22oz ? 'block' : 'hidden'}`}
            onClick={() => handleSizeChange('22oz')}
          >
            22oz
          </button>
        </div>
        <div>
          <h1 className="mt-2">Add Ons</h1>
          <div className="text-sm flex flex-wrap gap-2">
            {addOnsList.map((e, i) => (
              <h1
                key={i}
                className={`p-2 cursor-pointer ${
                  addOns.includes(e) ? 'bg-primary text-white shadow-lit' : 'bg-white'
                }`}
                onClick={() => toggleAddOn(e)}
              >
                {e.name}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;