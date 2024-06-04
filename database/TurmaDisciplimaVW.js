const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class TurmaDisciplinaVW extends Model {}

TurmaDisciplinaVW.init(
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
    modelName: "TurmaDisciplinaVW",
    tableName: "turma_disciplinaVW",
    timestamps: true,
  }
);

async function sincronizarTurmaDisciplinaVW() {
  try {
    await TurmaDisciplinaVW.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

TurmaDisciplinaVW.sync({ force: false }).then(() => {});
module.exports = TurmaDisciplinaVW;
