const contenidoPrincipal = document.querySelector('.container-characters');

function Characters(){
    const url = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9bc24eeb410ab29a4472fec0c1d8836d&hash=e71f2ce7159b94f049d4bfd87ba0929c';
    let copyOfCharacters = [];

    fetch(url)
    .then(response => response.json())
    .then(result => {
        copyOfCharacters = [...result.data.results];
        console.log(copyOfCharacters);
        MostrarResultados(copyOfCharacters);
    });
    
}

function MostrarResultados(arr){
    arr.forEach(element => {
        let card = document.createElement('div');
        card.innerHTML = `
        <img src="${element.thumbnail.path}.${element.thumbnail.extension}"/>
        <h3>${element.name}</h3>
        `;
        card.classList.add('card');
        contenidoPrincipal.appendChild(card);
    })
}

Characters(); 