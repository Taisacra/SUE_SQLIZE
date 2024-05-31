// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Professor_has_Disciplina = connection.define(
  "professor_has_disciplina",
  {
    Professor_idProfessor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    Disciplinas_idDisciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "professor_has_disciplina", // Nome da tabela no banco de dados
  }
);

async function sincronizarProfessor_has_Disciplina() {
  try {
    await Professor_has_Disciplina.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } 
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Professor_has_Disciplina, sincronizarProfessor_has_Disciplina};
//module.exports = sincronizarDisciplina();

 /* module.exports = {
  Professor_has_Disciplina: Professor_has_Disciplina,
    sincronizarProfessor_has_Disciplina: sincronizarProfessor_has_Disciplina
  };  */