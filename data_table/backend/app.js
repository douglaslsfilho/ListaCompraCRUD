const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const categoryRoutes = require('./routes/categoryRoutes');

require('dotenv').config();

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

app.use('/api/items', itemRoutes);

app.use('/api/categories', categoryRoutes);

// Conectando ao MongoDB
mongoose.connect( process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// require("./connection")
