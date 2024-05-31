// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Turma_has_Disciplinas = connection.define(
  "turma_has_disciplinas",
  {
    Turma_idTurma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Disciplia_idDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false, 
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "turma_has_disciplinas", // Nome da tabela no banco de dados
  }
);

async function sincronizarTurma_has_Disciplinas() {
  try {
    await Turma_has_Disciplinas.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Turma_has_Disciplinas, sincronizarTurma_has_Disciplinas};
//module.exports = sincronizarDisciplina();

  /* module.exports = {
    Turma_has_Disciplinas: Turma_has_Disciplinas,
    sincronizarTurma_has_Disciplinas: sincronizarTurma_has_Disciplinas
  };  */ 