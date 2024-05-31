// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Professor = connection.define(
  "professor",
  {
    idProfessor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "professor", // Nome da tabela no banco de dados
  }
);

async function sincronizarProfessor() {
  try {
    await Professor.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Professor, sincronizarProfessor};
//module.exports = sincronizarDisciplina();

 /* module.exports = {
    Professor: Professor,
    sincronizarProfessor: sincronizarProfessor
  };   */