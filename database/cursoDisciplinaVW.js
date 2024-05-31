const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const CursoDisciplinaVW = connection.define(
    "cursoDisciplinaVW",
    {
       curso_idCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
           refereces: {
               model:"Curso",
                key:"id_curso",
           }
       },
       nome: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: false,
       },
       disciplina_idDisciplina:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
       },
       id_disciplina:{
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
      tableName: "cursoDisciplinaVW",
      timestamps: false,
    }
);
async function sincronizarCursoDisciplinaVW() {
  try {
    await CursoDisciplinaVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//CursoDisciplinaVW.sync({ force: false }).then(() => {});
//module.exports = CursoDisciplinaVW;

module.exports = {
      CursoDisciplinaVW: CursoDisciplinaVW,
      sincronizarCursoDisciplinaVW: sincronizarCursoDisciplinaVW
};  


/*   const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class DisciplinaCursoVW extends Model {}

DisciplinaCursoVW.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_curso",
      },
      nome_curso: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCursoVW",
    tableName: "vw_disciplina_curso",
    timestamps: false,
  }
);

async function sincronizarDisciplinaCursoVW() {
  try {
    await DisciplinaCursoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCursoVW.sync({ force: false }).then(() => {});
module.exports = DisciplinaCursoVW;
 */

