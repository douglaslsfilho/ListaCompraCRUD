// const mongoose = require('mongoose');

// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASS;

// const connect = () => {
//     mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@null/?retryWrites=true&w=majority&appName=Cluster`)

//     const connection = mongoose.connection;

//     connection.on("error", () => {
//         console.error("Erro ao conectar com o mongoDB")
//     })

//     connection.on("open", () => {
//         console.log("Conetado ao mongoDB com sucesso!")
//     } )
// }

// connect();

// module.exports = mongoose;