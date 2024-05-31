const express = require('express');
const app = express();
//configura a biblioteca padrão de renderização de páginas HTML o EJS
const port = 3000;
// importa o módulo database criado  dentro da pasta Database
const connection = require("./database/database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//Importa (MODEL) que corresponde à uma tabela do banco de dados.
const Aluno = require("./database/Aluno");
const Coordenador = require("./database/Coordenador");
const Curso_has_disciplina = require('./database/Curso_has_disciplina');
const Curso = require("./database/Curso");
const DescricaoPagamento = require("./database/DescricaoPagamento");
const Disciplina = require("./database/Disciplina");
const Pagamento = require("./database/Pagamento");
const Professor_has_Disciplina = require("./database/Professor_has_disciplina");
const Professor = require("./database/Professor");
const Responsavel_Financeiro = require("./database/Responsavel_financeiro");
const Turma_has_aluno = require("./database/Turma_has_aluno");
const Turma_has_Disciplinas = require("./database/Turma_has_disciplina");
const Turma = require('./database/Turma');
const Usuario = require("./database/Usuario");
const CursoDisciplinaVW = require("./database/cursoDisciplinaVW");

const res = require('express/lib/response');

 /* Aluno.sincronizarAluno();
 Coordenador.sincronizarCoordenador();
 Curso_has_disciplinas.sincronizarCurso_has_disciplinas();
 Curso.sincronizarCurso();
 DescricaoPagamento.sincronizarDescricaoPagamento();
 Disciplina.sincronizarDisciplina();
 Pagamento.sincronizarPagamento();
 Professor_has_Disciplina.sincronizarProfessor_has_Disciplina();
 Professor.sincronizarProfessor();
 Responsavel_Financeiro.sincronizarResponsavel_financeiro();
 Turma_has_aluno.sincronizarTurma_has_aluno();
 Turma_has_Disciplinas.sincronizarTurma_has_Disciplinas();
 Turma.sincronizarTurma();
 Usuario.sincronizarUsuario(); */
//CursoDisciplinaVW.sincronizarCursoDisciplinaVW()


// ROTA PARA CRUD DISCIPLINA
app.get("/disciplinas", (req, res) => {
    Disciplina.findAll({
      raw: true,
      order: [
        ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
      ],
    }).then((disciplinas) => {
      res.render("cad_disciplinas", {
        disciplinas: disciplinas,
      });
    });
  });
  
  // Rota para inserir dados na tabela
  app.post("/editar_disciplina", async (req, res) => {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action } =
      req.body;
    const id = req.params.id;
    console.log(
      "****Dados disciplina: => ESTOU EM /editar_disciplina",
      nome_disciplina,
      carga_horaria,
      descricao_disciplina,
      action,
      id
    );
    // ESTA INCLUSÃO ESTÁ FUNCIONANDO
    if (action === "incluir") {
      try {
        //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
        const id = req.params.id;
        await Disciplina.create({
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
        });
        //res.status(201).json(disciplina);
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          "Erro ao inserir dados PARA A DISCIPLINA: /editardisciplina",
          error
        );
        res.status(500).json({
          error: "Erro ao inserir dados PARA A DISCIPLINA. /editardisciplina",
        });
      }
    }
    // A ALTERAÇÃO ESTÁ FUNCINANDO
    if (action === "alterar") {
      try {
        const {
          nome_disciplina,
          carga_horaria,
          descricao_disciplina,
          id_disciplina,
        } = req.body;
        const id = id_disciplina;
        //const id = req.params.id;
        const disciplina = await Disciplina.findByPk(id);
        if (!disciplina) {
          return res.status(404).json({
            error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
          });
        }
        disciplina.nome_disciplina = nome_disciplina;
        disciplina.carga_horaria = carga_horaria;
        disciplina.descricao_disciplina = descricao_disciplina;
        await disciplina.save();
        res.status(201).redirect("/disciplinas");
      } catch (error) {
        console.error(
          `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
          error
        );
        res.status(500).json({
          error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
        });
      }
    }
  });
  
  
  // Rota para excluir dados da tabela
  // ESTA FUNCIONA. iNCLUIR Mensagem de operação BEM SUCEDIDA.
  app.post("/excluir_disciplina/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const disciplina = await Disciplina.findByPk(id);
      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }
      // PARA EXCLUIR A DISCIPLINA COM A CHAVE INFORMADA
      await Disciplina.destroy({
        where: {
          id_disciplina: id,
        },
      });
      res.redirect("/disciplinas");
      //res.json({ message: "Disciplina excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir dados:", error);
      res
        .status(500)
        .json({ error: "Erro ao excluir dados da tabela de disciplina." });
    }
  }); 

  // ROTA PARA CRUD DE USUÁRIO
  app.get("/usuario", (req, res) => {
    Usuario. findAll({
      raw: true,
      order: [
        ["idUsuario", "DESC"], // ASC = Crescente || DESC = Decrescente
      ],
    }).then((usuarios) => {
      res.render("cad_usuario", {
        usuarios: usuarios,
      });
    });
  });

  // Rota para inserir dados na tabela
  app.post("/editar_usuario", async (req, res) => {
    const { nome_usuario, cpf, telefone,data_nascimento, cep, rua, numero_casa, bairro, cidade, estado, complemento, action } =
      req.body;
    const id = req.params.id;
    console.log(
      "****Dados usuario: => ESTOU EM /editar_usuario",
      nome_usuario,
      cpf,
      telefone,
      data_nascimento,
      cep,
      rua,
      numero_casa,
      bairro,
      cidade,
      estado,
      complemento,
      action,
      id
    );
    // ESTA INCLUSÃO ESTÁ FUNCIONANDO
    if (action === "incluir") {
      try {
        //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
        const id = req.params.id;
        await Usuario.create({
          nome_usuario,
          cpf,
          telefone,
          data_nascimento,
          cep,
          rua,
          numero_casa,
          bairro,
          cidade,
          estado,
          complemento,
        });
        //res.status(201).json(usuario);
        res.status(201).redirect("/usuario");
      } catch (error) {
        console.error(
          "Erro ao inserir dados PARA A usuario: /editarusuario",
          error
        );
        res.status(500).json({
          error: "Erro ao inserir dados PARA A usuario: /editarusuario",
        });
      }
    }
    // A ALTERAÇÃO ESTÁ FUNCINANDO
    if (action === "alterar") {
      try {
        const {
          nome_usuario,
          cpf,
          telefone,
          data_nascimento,
          cep,
          rua,
          numero_casa,
          bairro,
          cidade,
          estado,
          complemento,
        } = req.body;
        const id =idUsuario;
        //const id = req.params.id;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
          return res.status(404).json({
            error: `Usuario NÃO FOI encontrada - NA TABELA DE Usuario - ID: ${id}.`,
          });
        }
        usuario. nome_usuario = nome_usuario;
        usuario.cpf = cpf;
        usuario.telefone = telefone;
        usuario.data_nascimento = data_nascimento;
        usuario.cep = cep;
        usuario.rua = rua;
        usuario.numero_casa = numero_casa;
        usuario.bairro = bairro;
        usuario.cidade = cidade;
        usuario.estado = estado;
        usuario.complemento = complemento;

        await usuario.save();
        res.status(201).redirect("/usuario");
      } catch (error) {
        console.error(
          `Erro ao ALTERAR dados PARA A usuario: /editarusuario ${nome_usuario}`,
          error
        );
        res.status(500).json({
          error: `Erro ao ALTERAR dados PARA A usuario. /editarusuario ${nome_usuario}`,
        });
      }
    }
  });
  
  













/* //ROTA PARA CRUD COORDENADOR
app.get("/coordenador", async (req, res) => {
  try{
  const resultadoUsuario = await Usuario.findAll({
  const resultadoCoordenador = await Coordenador.findAll({
    raw: true,
    order: [
      ["idCoordenador", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  })
    res.render("cad_coordenador", {
    coordenador: coordenador,
  });
  })
     
  then((coordenador) => {
    
  });
  }catch(erro){

  }
});
// ESTA INCLUSÃO ESTÁ FUNCIONANDO
if (action === "incluir") {
  try {
    //const { nome_disciplina, carga_horaria, descricao_disciplina } = req.body;
    const id = req.params.id;
    await Coordenador.create({
      idCoordenador,
      Usuario_idUsuario,
    });
    //res.status(201).json(disciplina);
    res.status(201).redirect("/coordenador");
  } catch (error) {
    console.error(
      "Erro ao inserir dados PARA COORDENADOR: /editardiscoordenador",
      error
    );
    res.status(500).json({
      error: "Erro ao inserir dados PARA COORDENADOR: /editardiscoordenador",
    });
  }
}

// A ALTERAÇÃO ESTÁ FUNCINANDO
if (action === "alterar") {
  try {
    const {
      nome_disciplina,
      carga_horaria,
      descricao_disciplina,
      id_disciplina,
    } = req.body;
    const id = id_disciplina;
    //const id = req.params.id;
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) {
      return res.status(404).json({
        error: `Disciplina NÃO FOI encontrada - NA TABELA DE DISCIPLINAS - ID: ${id}.`,
      });
    }
    disciplina.nome_disciplina = nome_disciplina;
    disciplina.carga_horaria = carga_horaria;
    disciplina.descricao_disciplina = descricao_disciplina;
    await disciplina.save();
    res.status(201).redirect("/disciplinas");
  } catch (error) {
    console.error(
      `Erro ao ALTERAR dados PARA A DISCIPLINA: /editardisciplina ${nome_disciplina}`,
      error
    );
    res.status(500).json({
      error: `Erro ao ALTERAR dados PARA A DISCIPLINA. /editardisciplina ${nome_disciplina}`,
    });
  }
}
});



// ROTA PARA CRUD DE COORDENADOR
app.get("/coordenador", async (req, res) => {
  try {
    // Usando Promise.all para buscar dados de ambas as tabelas de forma assíncrona
    const [usuarios, coordenadores] = await Promise.all([
      Usuario.findAll({ raw: true }),
      Coordenador.findAll({
        raw: true,
        order: [["idCoordenador", "DESC"]],
      }),
    ]);

    // Renderizando a página após a conclusão das consultas assíncronas
    res.render("cad_coordenador", {
      usuarios: usuarios,
      coordenadores: coordenadores,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    res.status(500).send("Ocorreu um erro ao buscar os coordenadores.");
  }
}); */

//TESTANDO A CONEXÃO 
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) =>{
        console.log(msgErro);
    });

app.listen(port, ()=>{
    console.log(`A aplicação está rodando ${port}`);
})