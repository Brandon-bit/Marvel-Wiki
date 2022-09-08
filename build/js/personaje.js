const perfilContenedor = document.querySelector('.perfil-general');
const comicsContenedor = document.querySelector('.comics-contenedor');
const seriesContenedor = document.querySelector('.series-contenedor');

ObtenerId();

function ObtenerId(){
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    const id = urlParams.get('id');
    ObtenerPersonaje(id);
}

async function ObtenerPersonaje(id){
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=9bc24eeb410ab29a4472fec0c1d8836d&hash=e71f2ce7159b94f049d4bfd87ba0929c`;

    try{
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        await MostrarResultado(resultado.data.results);
    }catch{
        console.log(error);
    }
}

function MostrarResultado(arr){
    LimpiarHtml();

    arr.forEach(element => {
        console.log(element);
        const divImagen = document.createElement('div');
        const divInfo = document.createElement('div');

        divImagen.innerHTML = `<img src="${element.thumbnail.path}.${element.thumbnail.extension}"/>`;
        
        if(element.description == ''){
            divInfo.innerHTML = `
                <h1>${element.name}</h1>
                <p>Sorry, I´m not The Watcher, I don´t have the info about this character.</p>
            `;
        }else{
            divInfo.innerHTML = `
                <h1>${element.name}</h1>
                <p>${element.description}</p>
            `;
        }
        
        

        divImagen.classList.add('div-imagen');
        divInfo.classList.add('div-info');

        perfilContenedor.appendChild(divImagen);
        perfilContenedor.appendChild(divInfo);
    })

}

function LimpiarHtml(){
    while(perfilContenedor.hasChildNodes()){
        perfilContenedor.removeChild(perfilContenedor.firstChild);
    }
    while(comicsContenedor.hasChildNodes()){
        comicsContenedor.removeChild(comicsContenedor.firstChild);
    }
    while(seriesContenedor.hasChildNodes()){
        seriesContenedor.removeChild(seriesContenedor.firstChild);
    }
}

