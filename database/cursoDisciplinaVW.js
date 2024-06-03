const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class CursoDisciplinaVW extends Model {}

CursoDisciplinaVW.init(
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
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_curso",
      },
    },
  },
  {
    sequelize,
    modelName: "CursoDisciplinaVW",
    tableName: "curso_has_disciplinas",
    timestamps: true,
  }
);

async function sincronizarCursoDisciplinaVW() {
  try {
    await CursoDisciplinaVW.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

module.exports = CursoDisciplinaVW;
//module.exports = sincronizarCurso();

/* module.exports = {
  CursoDisciplinaVW: CursoDisciplinaVW,
  sincronizarCursoDisciplinaVW: sincronizarCursoDisciplinaVW
}; 
 */
