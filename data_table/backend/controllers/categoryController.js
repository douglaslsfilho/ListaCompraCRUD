const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const { nome } = req.body;
  const newCategory = new Category({ nome });
  await newCategory.save();
  res.json(newCategory);
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ message: 'Categoria removida' });
};
