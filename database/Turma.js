// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Turma = connection.define(
  "turma",
  {
    idTurma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    turno: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    curso_idCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "turma", // Nome da tabela no banco de dados
  }
);

async function sincronizarTurma() {
  try {
    await Turma.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Turma, sincronizarTurma};
//module.exports = sincronizarDisciplina();

/*  module.exports = {
    Turma: Turma,
    sincronizarTurma: sincronizarTurma
  };   */