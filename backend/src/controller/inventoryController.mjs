import inventoryModel from "../model/inventoryModel.mjs";

const inventoryController = {
  // Add an item to the database
  addItem: async (req, res) => {
    try {
      const { name, amount, category, denominator, unit } = req.body;

      // Create a new item
      const newItem = await inventoryModel.create({ name, amount, category, numerator: denominator, denominator, unit });

      res.status(201).send({ message: "Item  added", data : newItem });
    } catch (error) {

      // if the frontend is working correctly, this will be the only error message we can get due to the model schema
      res.status(400).send({ message: "Item already exists" });
    }
  },

  // Get an item based on its name
  getItemById: async (req, res) => {
    try {
      const { _id } = req.params;

      // Find the item by name
      const item = await inventoryModel.findOne({ _id }); // Query by name

      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send({ message: "Item found", data : item });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  updateItemByName: async (req, res) => {
    try {
      const { name, decrement } = req.body;
  
      if (!decrement || decrement <= 0) {
        return res.status(400).send({ message: "Invalid decrement value" });
      }
  
      // Find the item first
      const item = await inventoryModel.findOne({ name });
      if (!item) {
        return res.status(404).send({ name, message: "Item not found" });
      }
      
      let newNumerator = 0
      let addedAmount = Math.floor(decrement / item.denominator)
      if(decrement % item.denominator > item.numerator){
        addedAmount += 1
        newNumerator = item.denominator - (decrement % item.denominator)
      }else{
        newNumerator = item.numerator - decrement
      }


      const updatedItem = await inventoryModel.findOneAndUpdate(
        { name },
        {
          $inc: { amount: -(addedAmount)},
          numerator: newNumerator
        },
        { new: true }
      );
  
      return res.status(200).send({
        message: "Amount decremented",
        data: updatedItem,
      });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  


  // Find items based on their category
  getItemByCategory: async (req, res) => {
    try {
      const { category } = req.params;

      // Find items with the given category
      const items = await inventoryModel.find({ category });

      if (items.length === 0) {
        return res.status(404).send({ message: "No items found for this category" });
      }

      res.status(200).send({ message: "Items found", data : items });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Delete an item by name
  deleteItemById: async (req, res) => {
    try {
      const { _id } = req.params;

      // Find and delete the item
      const deletedItem = await inventoryModel.findOneAndDelete({ _id });

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send({ message: "Item succesfully deleted", data : deletedItem});
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  updateStockById: async function(req, res){
    try{
      const updatedItem = await inventoryModel.findOneAndUpdate({_id: req.params._id}, {amount: req.body.amount, name: req.body.name}, {new: true})
      if (!updatedItem){
        res.status(404).send({message: "Item not found"})
      }else{
        res.status(200).send({message: "Item was updated", data: updatedItem})
      }
    }catch(error){
      res.status(400).send({ message: error.message })
    }
  }
};

export default inventoryController;