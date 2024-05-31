// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Pagamento = connection.define(
  "Pagamento",
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_Vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valor_Previsto: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    id_Curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_descricao_pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_pago: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numero_parcelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    responsavelFinanceiro_idResponsavelFinanceiro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    responsavelFinanceiro_Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    curso_isCurso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    curso_coordenador_idCoordenador: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    curso_coordenador_Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricaoPagamento_idDescricaoPagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "pagamento", // Nome da tabela no banco de dados
  }
);

async function sincronizarPagamento() {
  try {
    await Pagamento.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {Pagamento, sincronizarPagamento};
//module.exports = sincronizarDisciplina();

/* module.exports = {
    Pagamento: Pagamento,
    sincronizarPagamento: sincronizarPagamento
  }; */
