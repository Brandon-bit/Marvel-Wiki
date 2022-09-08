const contenidoPrincipal = document.querySelector('.container-characters');
const botonNext = document.querySelector('.boton-siguiente');
const botonBefore = document.querySelector('.boton-anterior');
const botonBuscar = document.querySelector('.boton-buscar');
const botonRegresar = document.querySelector('.contenedor-regresar');


let offset = 0;

Characters(offset);

async function Characters(offset){
    const url = `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&ts=1&apikey=9bc24eeb410ab29a4472fec0c1d8836d&hash=e71f2ce7159b94f049d4bfd87ba0929c`;

    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        await MostrarResultados(resultado.data.results);
        await AparecerBotones('grupal', offset); 
    }catch(error){
        console.log(error);
    }
    
}

function MostrarResultados(arr){
    LimpiarHtml();
    arr.forEach(element => {
        let card = document.createElement('div');
        card.innerHTML = `
        <div class="img-contenedor">
            <img src="${element.thumbnail.path}.${element.thumbnail.extension}"/>
        </div>
        <h3>${element.name}</h3>
        `;
        card.classList.add('card');
        card.setAttribute('id', `${element.id}`);
        contenidoPrincipal.appendChild(card);
    })
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

botonBuscar.addEventListener('click', () =>{
    const nombre = document.querySelector('.barra').value;
    let nameString = '';

    for(let i = 0; i < nombre.length; i++){
        if(nombre[i] == ' '){
            nameString += '%20';
        }else{
            nameString += nombre[i];
        }
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${nameString}&ts=1&apikey=9bc24eeb410ab29a4472fec0c1d8836d&hash=e71f2ce7159b94f049d4bfd87ba0929c`;
    

    TraerPersonaje(url);

    
})

async function TraerPersonaje(url){
    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        await MostrarResultados(resultado.data.results);
        await AparecerBotones('Individual', 0);
    }catch(error){
        console.log(error);
    }

    
}

function AparecerBotones(tipo, offset){
    if(tipo == 'grupal'){
        if(offset == 0){
            if(!botonBefore.classList.contains('ocultar')){
                botonBefore.classList.add('ocultar');
            }
            if(botonNext.classList.contains('ocultar')){
                botonNext.classList.remove('ocultar');
            }
            if(!botonRegresar.classList.contains('ocultar')){
                botonRegresar.classList.add('ocultar');
            }
        }else{
            botonBefore.classList.remove('ocultar');
        }
    }else{
        if(!botonBefore.classList.contains('ocultar')){
            botonBefore.classList.add('ocultar');
        }
        if(!botonNext.classList.contains('ocultar')){
            botonNext.classList.add('ocultar');
        }
        botonRegresar.classList.remove('ocultar');
    }
}

contenidoPrincipal.addEventListener('click', AbrirPagina);

function AbrirPagina(e){
    if(e.target.parentNode.parentNode.classList.contains('card')){
        const id = e.target.parentNode.parentNode.getAttribute('id');
        window.open(`character.html?id=${id}`, '_self');
    }
}

