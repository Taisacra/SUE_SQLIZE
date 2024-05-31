const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Curso = connection.define(
  "curso",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    coordenador_idCoordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "curso", // Nome da tabela no banco de dados
  }
);

async function sincronizarCurso() {
  try {
    await Curso.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Curso, sincronizarCurso};
//module.exports = sincronizarCurso();

/*  module.exports = {
    Curso: Curso,
    sincronizarCurso: sincronizarCurso
  };  */
