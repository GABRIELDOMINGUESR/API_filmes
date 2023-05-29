const apikey = 'f360289b';

document.addEventListener('DOMContentLoaded', function() {
    const frmPesquisa = document.querySelector('form');

    if (frmPesquisa) {
        frmPesquisa.addEventListener('submit', function(ev) {
            ev.preventDefault();

            const pesquisa = ev.target.pesquisas.value;

            if (pesquisa === "") {
                alert("Preencha o campo!");
                return;
            }

            fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apikey}`)
                .then(result => result.json())
                .then(json => carregaLista(json));
        });
    }
});

const carregaLista = (json) => {
    const lista = document.querySelector("div.lista");
    if (lista) {
        lista.innerHTML = "";

        if (json.Response == 'False') {
            alert('Nenhum Filme Encontrado')
            return;
        }

        json.Search.forEach(element => {
            //console.log(element);

            const item = document.createElement("div");
            item.classList.add("item");

            item.innerHTML = `<img src="${element.Poster}" /><h2>${element.Title}</h2>`;

            lista.appendChild(item);
        });
    }
};