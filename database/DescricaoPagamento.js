// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const DescricaoPagamento = connection.define(
  "descricaoPagamento",
  {
    id_DescricaoPagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "descricaoPagamento", // Nome da tabela no banco de dados
  }
);

async function sincronizarDescricaoPagamento() {
  try {
    await DescricaoPagamento.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {DescricaoPagamento, sincronizarDescricaoPagamento};
//module.exports = sincronizarDescricaoPagamento();

 /* module.exports = {
    DescricaoPagamento: DescricaoPagamento,
    sincronizarDescricaoPagamento: sincronizarDescricaoPagamento
  };  */