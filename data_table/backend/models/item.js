const mongoose = require('mongoose');
const category = require('./category');

const itemSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  comprado: Boolean,
  categoria: String
});

module.exports = mongoose.model('Item', itemSchema);