// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Responsavel_financeiro = connection.define(
  "responsavel_financeiro",
  {
    id_responsavel_financeiro: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "responsavel_financeiro", // Nome da tabela no banco de dados
  }
);

async function sincronizarResponsavel_financeiro() {
  try {
    await Responsavel_financeiro.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Responsavel_financeiro, sincronizarResponsavel_financeiro};
//module.exports = sincronizarDisciplina();

 /* module.exports = {
  Responsavel_financeiro: Responsavel_financeiro,
    sincronizarResponsavel_financeiro: sincronizarResponsavel_financeiro
  };  */
