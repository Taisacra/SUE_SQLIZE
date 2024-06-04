const express = require('express');
const app = express();
//configura a biblioteca padrão de renderização de páginas HTML o EJS
const port = 3005;
// importa o módulo database criado  dentro da pasta Database
const connection = require("./database/database");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//Importa (MODEL) que corresponde à uma tabela do banco de dados.
const Aluno = require("./database/Aluno");
const Coordenador = require("./database/Coordenador");
const DisciplinaCurso = require('./database/DisciplinaCurso');
const Curso = require("./database/Curso");
const DescricaoPagamento = require("./database/DescricaoPagamento");
const Disciplina = require("./database/Disciplina");
const Pagamento = require("./database/Pagamento");
const Professor_has_Disciplina = require("./database/Professor_has_disciplina");
const Professor = require("./database/Professor");
const Responsavel_Financeiro = require("./database/Responsavel_financeiro");
const Turma_has_aluno = require("./database/Turma_has_aluno");
const TurmaDisciplinas = require("./database/TurmaDisciplinas");
const Turma = require('./database/Turma');
const Usuario = require("./database/Usuario");
const CursoDisciplinaVW = require("./database/cursoDisciplinaVW");

const res = require('express/lib/response');

 /* Aluno.sincronizarAluno();
Coordenador.sincronizarCoordenador();
Curso.sincronizarCurso();
CursoDisciplinaVW.sincronizarCursoDisciplinaVW()
DisciplinaCurso.sincronizarDisciplinaCurso();
 DescricaoPagamento.sincronizarDescricaoPagamento();
 Disciplina.sincronizarDisciplina();
 Pagamento.sincronizarPagamento();
 Professor_has_Disciplina.sincronizarProfessor_has_Disciplina();
 Professor.sincronizarProfessor();
 TurmaDisciplinas.sincronizarTurmaDisciplinas();
 Responsavel_Financeiro.sincronizarResponsavel_financeiro();
 Turma_has_aluno.sincronizarTurma_has_aluno();
 Turma.sincronizarTurma();
 Usuario.sincronizarUsuario(); */



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

  
// ROTA PARA CRUD DE COORDENADOR
app.get("/coordenador", async (req, res) => {
  try {
    const coordenadores = await Coordenador.findAll();
    const usuarios = await Usuario.findAll();
    res.render("cad_coordenador", {
      coordenadores,
      usuarios,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de usuario a tabela de cordenador:", error);
    res.status(500).send("Erro ao buscar associações de usuario a tabela de cordenador");
  }
});

app.post("/editar_Coordenador", async (req, res) => {
  try {
    const { usuario, action } = req.body;

    if (action === "incluir") {
      await Coordenador.create({
        Usuario_idUsuario: usuario,
      });
      res.redirect("/coordenador");
    } else if (action === "alterar") {
      const id_Coordenador = req.body.idCoordenador;
      await Coordenador.update(
        { idUsuario: usuario },
        { where: { idCoordenador } }
      );
      res.redirect("/coordenador");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre usuario e coordenador:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre usuario e coordenador.");
  }
});

app.post("/excluir_coordenador/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Coordenador.destroy({ where: { idCoordenador: id } });
    res.redirect("/coordenador");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre usuario e coordenador:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre usuario e coordenador.");
  }
});



// ROTA PARA CRUD DISCIPLINA_CURSO
// Rota para inserir ou editar uma associação entre disciplina e curso
app.get("/disciplina_curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();

    const disciplinaCursos = await DisciplinaCurso.findAll();
    res.render("cad_curso_disciplina", {
      disciplinaCursos,
      cursos,
      disciplinas,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});

app.post("/editar_disciplinaCurso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        curso_id_curso: curso,
        disciplina_id_disciplina: disciplina,
      });
      res.redirect("/disciplina_curso");
    } else if (action === "alterar") {
      const id_disciplinaCurso = req.body.id_disciplinaCurso;
      await DisciplinaCurso.update(
        { id_curso: curso, id_disciplina: disciplina },
        { where: { id_disciplinaCurso } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

// Rota para excluir uma associação entre disciplina e curso
app.post("/excluir_disciplina_curso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await DisciplinaCurso.destroy({ where: { id_disciplinaCurso: id } });
    res.redirect("/disciplina_curso");
  } catch (error) {
    console.error(
      "Erro ao excluir associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao excluir associação entre disciplina e curso.");
  }
});

//ROTA PARA CRUD DE CURSO
app.get("/curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [{ model: Coordenador, attributes: ['nome'] }]
    });
    const coordenadores = await Coordenador.findAll();
    res.render("cad_curso", { cursos, coordenadores });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    res.status(500).send("Erro ao buscar cursos.");
  }
});


// Rota para inserir ou editar um curso
app.post("/editar_curso", async (req, res) => {
  try {
    const { nome, coordenador_idCoordenador, action } = req.body;

    if (action === "incluir") {
      await Curso.create({ nome, coordenador_idCoordenador });
    } else if (action === "alterar") {
      const id_curso = req.body.id_curso;
      await Curso.update({ nome, coordenador_idCoordenador }, { where: { id_curso } });
    } else {
      res.status(400).send("Ação inválida.");
    }
    res.redirect("/curso");
  } catch (error) {
    console.error("Erro ao inserir ou editar curso:", error);
    res.status(500).send("Erro ao inserir ou editar curso.");
  }
});

// Rota para excluir um curso
app.post("/excluir_curso/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Curso.destroy({ where: { id_curso: id } });
    res.redirect("/curso");
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    res.status(500).send("Erro ao excluir curso.");
  }
});





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