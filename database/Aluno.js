// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Aluno = connection.define(
  "aluno",
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Alunocol: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Usuario_idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "aluno", // Nome da tabela no banco de dados
  }
);

async function sincronizarAluno() {
  try {
    await Aluno.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Aluno, sincronizarAluno};
//module.exports = sincronizarAluno();

   /*  module.exports = {
    Aluno: Aluno,
    sincronizarAluno: sincronizarAluno
  };   */