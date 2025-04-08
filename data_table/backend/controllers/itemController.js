const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    const items = await Item.find(); // Remover o populate
    res.json(items);
  };
  

  exports.createItem = async (req, res) => {
    const { nome, quantidade, comprado, categoria } = req.body; // ✅ inclui categoria
    const newItem = new Item({ nome, quantidade, comprado, categoria }); // ✅ inclui aqui também
    await newItem.save();
    res.json(newItem);
  };
  
  

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.json({ message: 'Item deletado' });
};
