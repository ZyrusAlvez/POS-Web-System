import inventoryModel from "../model/inventoryModel.mjs";

const inventoryController = {
  // Add an item to the database
  addItem: async (req, res) => {
    try {
      const { name, amount, classification, denominator } = req.body;

      // Create a new item
      const newItem = await inventoryModel.create({ name, amount, classification, numerator: denominator, denominator });

      res.status(201).send({ message: "Item  added", data : newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
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
        return res.status(404).send({ message: "Item not found" });
      }
  
      let updatedNumerator = item.numerator - decrement;
  
      // Check if numerator goes below or equals 0
      if (updatedNumerator <= 0) {
        // Decrement amount and reset numerator
        const remainingNumerator = item.denominator + updatedNumerator; // Reset numerator to denominator value
        
        const updatedItem = await inventoryModel.findOneAndUpdate(
          { name },
          {
            $inc: { amount: -1 },
            numerator: remainingNumerator,
          },
          { new: true }
        );
  
        return res.status(200).send({
          message: "Amount decremented and numerator reset",
          data: updatedItem,
        });
      }
  
      // If numerator doesn't hit 0, just decrement numerator
      const updatedItem = await inventoryModel.findOneAndUpdate(
        { name },
        { $inc: { numerator: -decrement } },
        { new: true }
      );
  
      res.status(200).send({
        message: "Numerator decremented",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  


  // Find items based on their classification
  getItemByClassification: async (req, res) => {
    try {
      const { classification } = req.params;

      // Find items with the given classification
      const items = await inventoryModel.find({ classification });

      if (items.length === 0) {
        return res.status(404).send({ message: "No items found for this classification" });
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
};

export default inventoryController;