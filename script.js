console.log("rodando")

let tarefas = [];
let filtroAtual = "todas";

const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

function filtrar(tipo) {
    filtroAtual = tipo;
    renderizarTarefas();
}

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach(function (tarefa, index) {

        if (filtroAtual === "pendentes" && tarefa.concluida) return;
        if (filtroAtual === "concluidas" && !tarefa.concluida) return;

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tarefa.texto;

        if (tarefa.concluida) {
            span.classList.add("concluida");
        }

        span.addEventListener("click", function () {
            tarefas[index].concluida = !tarefas[index].concluida;
            salvarTarefas();
            renderizarTarefas();
        });

        const botaoDeletar = document.createElement("button");
        botaoDeletar.textContent = "X";

        botaoDeletar.addEventListener("click", function () {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", function(){
            const novoTexto = prompt("editar tarefa:", tarefa.texto);

            if (novoTexto !== null && novoTexto.trim() !== "") {
                tarefas[index].texto = novoTexto;
                salvarTarefas();
                renderizarTarefas();
            }
        });

        const divBotoes = document.createElement("div");

divBotoes.appendChild(botaoEditar);
divBotoes.appendChild(botaoDeletar);

li.appendChild(span);
li.appendChild(divBotoes);

        lista.appendChild(li);

        const contador = document.getElementById("contador");

        const total = tarefas.length;
        const concluidas = tarefas.filter(t => t.concluida).length;

        contador.textContent = `Total: ${total} | Concluídas: ${concluidas}`;
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const texto = input.value.trim();

    if (texto === "") return;

    tarefas.push({
        texto: texto,
        concluida: false
    });

    salvarTarefas();
    renderizarTarefas();

    input.value = "";
});

const tarefasSalvas = localStorage.getItem("tarefas");

if (tarefasSalvas) {
    tarefas = JSON.parse(tarefasSalvas);
}

renderizarTarefas();