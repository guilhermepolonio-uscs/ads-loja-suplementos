const form = document.getElementById('leadForm');
const listaLeads = document.getElementById('listaLeads');
const filtroProduto = document.getElementById('filtroProduto');

let leads = JSON.parse(localStorage.getItem('leads')) || [];


form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const produto = document.getElementById('produto').value;

  function adicionarLead(nome, whatsapp, produto) {
    const lead = {
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

    leads.forEach(function(lead, index) {
        if (produtoSelecionado === 'Todos' || lead.produto === produtoSelecionado) {

            const li = document.createElement('li');

            const texto = document.createElement('span');
            texto.textContent = `${lead.nome} - ${lead.whatsapp} - ${lead.produto}`;

            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.style.marginLeft = '10px';

            botaoExcluir.addEventListener('click', function () {
                excluirLead(index);
            });

            li.appendChild(texto);
            li.appendChild(botaoExcluir);
            listaLeads.appendChild(li);
        }
    });
}

filtroProduto.addEventListener('change', function() {
    atualizarLista();
});

function excluirLead(index) {
    leads.splice(index, 1);
    localStorage.setItem('leads', JSON.stringify(leads));
    atualizarLista();
}
