const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Curso_has_disciplinas = connection.define(
  "curso_has_disciplinas",
  {
    curso_idCurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
        refereces: {
          model:"Curso",
          key:"id_curso",
        },
    },
    disciplina_idDisciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false, 
        refereces: {
          model:"Disciplina",
          key:"id_disciplina",
        },
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "curso_has_disciplinas", // Nome da tabela no banco de dados
  }
);

async function sincronizarCurso_has_disciplinas() {
  try {
    await Curso_has_disciplinas.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Curso_has_disciplinas, sincronizarCurso_has_disciplinas };
//module.exports = sincronizarDisciplina();

 /* module.exports = {
  Curso_has_disciplinas: Curso_has_disciplinas,
    sincronizarCurso_has_disciplinas: sincronizarCurso_has_disciplinas
  };  */


