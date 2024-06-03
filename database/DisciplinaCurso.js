const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const DisciplinaCurso = connection.define(
  "disciplinaCurso",
  {
    id_disciplinaCurso:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    curso_id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
        refereces: {
          model:"Curso",
          key:"id_curso",
        },
    },
    disciplina_id_disciplina: {
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
    tableName: "DisciplinaCurso", // Nome da tabela no banco de dados
  }
);

async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});
 module.exports = DisciplinaCurso;
//module.exports = sincronizarDisciplinaCurso();

/*  module.exports = {
    DisciplinaCurso: DisciplinaCurso,
    sincronizarDisciplinaCurso: sincronizarDisciplinaCurso
  };  */


