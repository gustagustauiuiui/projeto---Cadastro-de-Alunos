const materias = [
    {
        nome: "POO",
        nota1: 10,
        nota2: 10
    },
    {
        nome: "Português",
        nota1: 9,
        nota2: 9
    }
];
const alunos = [
    {
        nome: "Regis",
        materias: [
            materias[0],
            materias[1]
        ]
    }
];

atualizarSelectMaterias();

function cadastrarMateria() {
    let nomeMateria = document.getElementById("nomeMateria").value;

    let cadastrado = materias.some(materia => materia.nome == nomeMateria);

    if (!cadastrado) {
        let materia = { nome: nomeMateria };
        materias.push(materia);
    } else {
        console.log(`a materia ${nomeMateria} ja esta acdastrada`);
    }

    atualizarSelectMaterias();
}

function cadastrar() {
    let aluno = new Object();
    let n1 = 0;
    let n2 = 0;

    document.getElementById("nome").value != "" ?
        aluno.nome = document.getElementById("nome").value : aluno.nome = "SEM NOME";
    document.getElementById("nota1").value != "" ?
        n1 = Number(document.getElementById("nota1").value) : n1 = 0;
    document.getElementById("nota2").value != "" ?
        n2 = Number(document.getElementById("nota2").value) : n2 = 0;

    let nomeMateria = document.getElementById("optMateria").value;

    let alunoCadastrado = alunos.find(a => a.nome == aluno.nome);

    if(alunoCadastrado){
        atualizarAluno(alunoCadastrado, nomeMateria, n1, n2);
    } else {
        aluno.materias = [
            {
                nome: nomeMateria,
                nota1: n1,
                nota2: n2
            }
        ];
        alunos.push(aluno);
        console.log("adicionado um novo aluno!");
    }
    console.table(alunos);
}

function atualizarAluno(aluno, nomeMateria, nota1, nota2) {
    console.log("atualizando aluno!!!!!");

    let cadastrado = aluno.materias.some(function (materia){
        if(materia.nome == nomeMateria){
            materia.nota1 = nota1;
            materia.nota2 = nota2;
            return true;
        }
    });

    if (!cadastrado) {
        let materia = {
            nome: nomeMateria,
            nota1: nota1,
            nota2: nota2
        };
        aluno.materias.push(materia);
    }
}

function atualizarSelectMaterias() {
    document.getElementById("optMateria").innerHTML = "";
    document.getElementById("materias").innerHTML = "";

    for (let materia of materias) {
        document.getElementById("optMateria").innerHTML += `
        <option value='${materia.nome}'>${materia.nome.toUpperCase()}</option>`;

        document.getElementById("materias").innerHTML += `
        <option value='${materia.nome}'>${materia.nome.toUpperCase()}</option>`;
    }
}

function pesquisar(){
    let materiaAtual = document.getElementById("materias").value;
    let alunosMateriaAtual = alunos.filter(a => a.materias.find(m => m.nome == materiaAtual));

    let texto1 = 
    `<table id="tabela" border="2px solid black">
    <tr>
        <th>Aluno: </th>
        <th>Nota 1:</th>
        <th>Nota 2:</th>
        <th>Média: </th>
    </tr>`;

    let texto2 = "";
    for(let aluno of alunosMateriaAtual){
        console.log(aluno);
        texto2 += 
        `<tr>
            <th>${aluno.nome} </th>
            <td>${aluno.materias.find(m => m.nome == materiaAtual).nota1}</td>
            <td>${aluno.materias.find(m => m.nome == materiaAtual).nota2}</td>
            <td>${calcularMedia(aluno, materiaAtual)}</td>
        </tr>`;
    }
    console.log(texto2);
    document.getElementById("tabela").outerHTML = texto1 + texto2 + "</table>";
}

function calcularMedia(aluno, materia){
    return Number((aluno.materias.find(m => m.nome == materia).nota1 + aluno.materias.find(m => m.nome ==  materia).nota2) / 2);
}