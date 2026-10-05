const campoTarefa = document.getElementById("campo-tarefa");
const campoPrazo = document.getElementById("campo-prazo");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefa");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alternar-tema");

let tarefas = [];

function adicionarTarefa() {
    const texto = campoTarefa.value.trim();
    const prazo = campoPrazo ? campoPrazo.value : "";

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        nome: texto,
        prazo: prazo,
        concluida: false,
        bloqueada: false
    };

    tarefas.push(tarefa);
    campoTarefa.value = "";
    campoPrazo.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, indice) => {
        const item = document.createElement("li");
        item.className = "item-tarefa";

        const conteudoTarefa = document.createElement("div");
        conteudoTarefa.className = "conteudo-tarefa";

        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;

        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }

        conteudoTarefa.appendChild(texto);

        if (tarefa.prazo) {
            const smallPrazo = document.createElement("small");
            smallPrazo.className = "prazo-tarefa";

            const partes = tarefa.prazo.split("-");
            if (partes.length === 3) {
                smallPrazo.textContent = `Prazo: ${partes[2]}/${partes[1]}/${partes[0]}`;
            } else {
                smallPrazo.textContent = `Prazo: ${tarefa.prazo}`;
            }

            if (tarefa.concluida) {
                smallPrazo.classList.add("concluida");
            }

            conteudoTarefa.appendChild(smallPrazo);
        }

        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = '<i class="fa-solid fa-check"></i>';
        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";

        botaoConcluir.addEventListener("click", function() {
            tarefas[indice].concluida = !tarefas[indice].concluida;
            mostrarTarefas();
        });

        const botaoBloquear = document.createElement("button");
        botaoBloquear.className = "botao-bloquear";
        if (tarefa.bloqueada) {
            botaoBloquear.innerHTML = '<i class="fa-solid fa-lock"></i>';
            botaoBloquear.title = "Desbloquear exclusão";
            botaoBloquear.classList.add("bloqueado");
        } else {
            botaoBloquear.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
            botaoBloquear.title = "Bloquear exclusão";
        }

        botaoBloquear.addEventListener("click", function() {
            tarefas[indice].bloqueada = !tarefas[indice].bloqueada;
            mostrarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";

        if (tarefa.bloqueada) {
            botaoExcluir.disabled = true;
            botaoExcluir.classList.add("desabilitado");
        }

        botaoExcluir.addEventListener("click", function() {
            if (tarefas[indice].bloqueada) {
                alert("Esta tarefa está bloqueada e não pode ser apagada!");
                return;
            }
            tarefas.splice(indice, 1);
            mostrarTarefas();
        });

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoBloquear);
        botoes.appendChild(botaoExcluir);

        item.appendChild(conteudoTarefa);
        item.appendChild(botoes);

        listaTarefas.appendChild(item);
    });

    contadorTarefas.textContent =
        tarefas.length + (tarefas.length === 1
            ? " tarefa na lista"
            : " tarefas na lista");
}

botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

botaoTema.addEventListener("click", function() {
    document.body.classList.toggle("tema-escuro");

    const icone = botaoTema.querySelector("i");

    if (document.body.classList.contains("tema-escuro")) {
        icone.className = "fa-solid fa-sun";
    } else {
        icone.className = "fa-solid fa-moon";
    }
});
