// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const TurmaDisciplinas = connection.define(
  "turmaDisciplinas",
  {
    idTurmaDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Turma_idTurma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      refereces: {
        model:"Turma",
        key:"idTurma",
      },
    },
    Disciplia_idDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false, 
      refereces: {
        model:"Disciplina",
        key:"id_disciplina",
      },
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "turmaDisciplinas", // Nome da tabela no banco de dados
  }
);

async function sincronizarTurmaDisciplinas() {
  try {
    await TurmaDisciplinas.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = TurmaDisciplinas;
//module.exports = sincronizarDisciplina();

 /*   module.exports = {
    TurmaDisciplinas: TurmaDisciplinas,
    sincronizarTurmaDisciplinas: sincronizarTurmaDisciplinas
  };   */