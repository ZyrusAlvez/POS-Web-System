import salesModel from "../model/salesModel.mjs"

const salesController = {
  addItem: async (req, res) => {
    try {
      const { billing, date, time, mop, ref, total } = req.body;

      const newItem = await salesModel.create({ billing, date, time, mop, ref, total });

      res.status(201).send({ message: "Transaction added to the history", data: newItem });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  getByDate: async (req, res) => {
    try {
      const { date } = req.params;

      const items = await salesModel.find({date});
      res.status(200).send({ message: "All transactions retrieved", data: items });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

export default salesController;