import inventoryModel from "../model/inventoryModel.mjs";

const inventoryController = {
  // Add an item to the database
  addItem: async (req, res) => {
    try {
      const { name, amount, classification } = req.body;

      // Create a new item
      const newItem = await inventoryModel.create({ name, amount, classification });

      res.status(201).send(newItem);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Get an item based on its name
  getItemByName: async (req, res) => {
    try {
      const { name } = req.params;

      // Find the item by name
      const item = await inventoryModel.findOne({ name }); // Query by name

      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send(item);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Update an item based on its name
  updateItemByName: async (req, res) => {
    try {
      const { name } = req.params;
      const { amount } = req.body;

      // Find and update the item
      const updatedItem = await inventoryModel.findOneAndUpdate(
        { name }, // Query by name
        { amount }, // Update fields
        { new: true } // Return the updated document
      );

      if (!updatedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send(updatedItem);
    } catch (error) {
      res.status(400).send({ message: error.message });
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

      res.status(200).send(items);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Delete an item by name
  deleteItemByName: async (req, res) => {
    try {
      const { name } = req.params;

      // Find and delete the item
      const deletedItem = await inventoryModel.findOneAndDelete({ name });

      if (!deletedItem) {
        return res.status(404).send({ message: "Item not found" });
      }

      res.status(200).send(deletedItem);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};

export default inventoryController;