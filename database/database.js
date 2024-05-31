// Importa a biblioteca sequelize
const Sequelize = require("Sequelize");
const { isModuleNamespaceObject } = require("util/types");

//Crcianado uma instância de Sequilize 
//Esta instancia é uma conexão com o banco de dados  MySQL.
const connection = new Sequelize("sue", "root", "",{
    host: "localhost",
    dialect: "mysql",
});

// Exportando o modúlo para fica visível em outro programa (possa chamar essa conexão)
module.exports = connection; 