// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Turma_has_aluno = connection.define(
  "Turma_has_aluno",
  {
    Aluno_idAluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Turma_idTurma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },   
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "turma_has_aluno", // Nome da tabela no banco de dados
  }
);

async function sincronizarTurma_has_aluno() {
  try {
    await Turma_has_aluno.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Turma_has_aluno, sincronizarTurma_has_aluno};
//module.exports = sincronizarTurma_has_aluno();

 /* module.exports = {
  Turma_has_aluno: Turma_has_aluno,
    sincronizarTurma_has_aluno: sincronizarTurma_has_aluno
  };  */