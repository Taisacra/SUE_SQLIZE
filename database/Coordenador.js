const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");
const { Usuario } = require("./Usuario");

const Coordenador = connection.define(
    "coordenador",
    {
      idCoordenador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
          
      },
    }, 
    {
      timestamps: true, // Habilita a criação automática de campos de timestamp
      tableName: "coordenador", // Nome da tabela no banco de dados
    }
  );

// Definindo a relação de chave estrangeira
//Coordenador.belongsTo(Usuario, { foreignKey: 'Usuario_idUsuario' });
  
  async function sincronizarCoordenador() {
    try {
      await Coordenador.sync({ force: false });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }
  
  //Disciplina.sync({ force: false }).then(() => {});
  
  module.exports = {Coordenador, sincronizarCoordenador};
  //module.exports = sincronizarDisciplina();
  
    /* module.exports = {
      Coordenador: Coordenador,
      sincronizarCoordenador: sincronizarCoordenador
    };  */