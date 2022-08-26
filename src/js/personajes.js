const contenidoPrincipal = document.querySelector('.container-characters');
const botonNext = document.querySelector('.boton-siguiente');
const botonBefore = document.querySelector('.boton-anterior');

let offset = 0;

Characters(offset); 

async function Characters(offset){
    const url = `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&ts=1&apikey=9bc24eeb410ab29a4472fec0c1d8836d&hash=e71f2ce7159b94f049d4bfd87ba0929c`;

    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const personajes = await ObtenerPersonajes(resultado.data.results)
    }catch(error){
        console(error);
    }
    
}

function ObtenerPersonajes(arr){
    let arrPersonajes = [];
    arrPersonajes = [...arr];
    MostrarResultados(arrPersonajes);
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

    if(offset == 0){
        botonBefore.classList.add('ocultar');
    }else{
        botonBefore.classList.remove('ocultar');
    }
}

botonBefore.addEventListener('click', () =>{
    LimpiarHtml();
    SetOffset('resta');
});

botonNext.addEventListener("click", () =>{
    LimpiarHtml();
    SetOffset('suma');
});

function SetOffset(operacion){
    if(operacion == 'suma'){
        offset += 20;
        Characters(offset);
    }else{
        offset -= 20;
        Characters(offset);
    }
}

function LimpiarHtml(){
    while(contenidoPrincipal.hasChildNodes()){
        contenidoPrincipal.removeChild(contenidoPrincipal.firstChild);
    }
}