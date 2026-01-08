const form = document.getElementById('leadForm');
const listaLeads = document.getElementById('listaLeads');

let leads = [];

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

    leads.forEach(function(lead) {
        const li = document.createElement('li');
        li.textContent = `${lead.nome} - ${lead.whatsapp} - ${lead.produto}`;
        listaLeads.appendChild(li);
    });
}
