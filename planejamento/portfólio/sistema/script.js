// ===== Seleção de elementos =====
const form = document.getElementById('leadForm');
const listaLeads = document.getElementById('listaLeads');
const filtroProduto = document.getElementById('filtroProduto');

// ===== Estado da aplicação =====
let leads = JSON.parse(localStorage.getItem('leads')) || [];

// ===== Evento de submit =====
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const produto = document.getElementById('produto').value;

    adicionarLead(nome, whatsapp, produto);
    form.reset();
});

// ===== Evento de filtro =====
filtroProduto.addEventListener('change', function() {
    atualizarLista();
});

// ===== Funções =====
function adicionarLead(nome, whatsapp, produto) {
    const lead = {
        id: Date.now(),
        nome,
        whatsapp,
        produto
    };

    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));
    atualizarLista();
}

function atualizarLista() {
    listaLeads.innerHTML = '';

    const produtoSelecionado = filtroProduto.value;

    leads.forEach(function(lead) {
        if (produtoSelecionado === 'Todos' || lead.produto === produtoSelecionado) {

            const li = document.createElement('li');

            const texto = document.createElement('span');
            texto.textContent = `${lead.nome} - ${lead.whatsapp} - ${lead.produto}`;

            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.style.marginLeft = '10px';

            botaoExcluir.addEventListener('click', function () {
                excluirLead(lead.id);
            });

            li.appendChild(texto);
            li.appendChild(botaoExcluir);
            listaLeads.appendChild(li);
        }
    });
}

function excluirLead(id) {
    leads = leads.filter(function(lead) {
        return lead.id !== id;
    });

    localStorage.setItem('leads', JSON.stringify(leads));
    atualizarLista();
}

// ===== Carregar lista ao abrir =====
atualizarLista();
