const form = document.getElementById('leadForm');
const listaLeads = document.getElementById('listaLeads');
const filtroProduto = document.getElementById('filtroProduto');

let leads = JSON.parse(localStorage.getItem('leads')) || [];


form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const produto = document.getElementById('produto').value;

    const lead = {
        nome: nome,
        whatsapp: whatsapp,
        produto: produto
    };

    leads.push(lead);
    atualizarLista();
    form.reset();
});

function atualizarLista() {
    listaLeads.innerHTML = '';

    const produtoSelecionado = filtroProduto.value;

    leads.forEach(function(lead) {
        if (produtoSelecionado === 'Todos' || lead.produto === produtoSelecionado) {
            const li = document.createElement('li');
            li.textContent = `${lead.nome} - ${lead.whatsapp} - ${lead.produto}`;
            listaLeads.appendChild(li);
        }
    });
}

filtroProduto.addEventListener('change', function() {
    atualizarLista();
});

