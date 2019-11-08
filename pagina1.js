

// Recojo los valores de la busqueda : nombre, año de publicacion, editorial y autor
let inputAnio = document.getElementById('inputAnioPublicacion');
let inputNombre = document.getElementById('name');
let idEditorial;
let idAutores;
let editoriales = document.createElement('option');
let autores = document.createElement('option');
let juegosalmacenados;
let juegosStorage = localStorage.getItem('juegos');
let juegos = JSON.parse(juegosStorage);
RellenarModal();




// // FETCH PARA MOSTRAR EDITORIALES

// fetch('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M')

//     .then(function (response) {
//         return response.json();

//     })

//     .then(function (myJson) {

//         for (let x = 0; x < myJson.games.length; x++) {

//             let menu = document.getElementById('dropdown-menu');
//             // Creo el elemento a poniedo el atributo de la clase
//             let editoriales = document.createElement('option');
//             editoriales.setAttribute('value', x + 1);
//             editoriales.setAttribute('class', 'dropdown-item');
//             editoriales.innerHTML = myJson.games[x].primary_publisher;
//             //console.log(myJson.games[x].primary_publisher);
//             menu.appendChild(editoriales);

//             editoriales.addEventListener('click', function () {

//                 //idAutores obtenido del Dropdown de Autores
//                 idEditorial = editoriales.value;

//             })
//         }
//     })



// //FETCH PARA MOSTRAR AUTORES (DROPDOWN)

// fetch('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M')

//     .then(function (response) {
//         return response.json();

//     })

//     .then(function (myJson) {

//         for (let y = 0; y < myJson.games.length; y++) {

//             let menu = document.getElementById('dropdown-menu1');
//             // Creo el elemento a poniedo el atributo de la clase
//             let autores = document.createElement('option');
//             autores.setAttribute('value', y + 1);
//             autores.setAttribute('class', 'dropdown-item');
//             autores.innerHTML = myJson.games[y].designers;

//             menu.appendChild(autores);

//             autores.addEventListener('click', function () {

//                 //idAutores obtenido del Dropdown de Autores
//                 idAutores = autores.value;

//             })
//         }
//     })

let boton = document.getElementById('boton');

boton.addEventListener('click', function () {




    // Linea para borrar busquedas. Por Cortesia de "Raul"
    document.getElementById('datosjuego').innerHTML = "";

    if ((inputNombre.value.length === 0 && inputAnio.value.length === 0 && idAutores === undefined && idEditorial === undefined) ) {
        alert("ERROR!! Debe introducir el nombre o el año para proceder a la busqueda")

    

//------------------------------------------------------------------------------------------------------

    } else {

//----------------RECOGEMOS  LAS BUSQUEDAS Y LAS ALMACENAMOS EN UN OBJETO "JUEGO"-------------------------------------------------------------
    // Cuando pulsamos el boton busqueda nos guarada cada juego en el array juego en formato JSON
    // Guardamos la variable en el localStorage

    let busquedajuego = {
        'nombre' : inputNombre.value,
        'anio'   : inputAnio.value

    }

   juegos.push(busquedajuego);
   localStorage.setItem('juegos', JSON.stringify(juegos));
   console.log(juegosalmacenados);
   RellenarModal();
   //----------------------------------------------------------------------------------------------------------------

        let url = 'https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M';
        let filtroNombre = false;
        let filtroAnio = false;
        if (inputNombre.value.length !== 0) {
            url += '&name=' + inputNombre.value
            filtroNombre = true;
        }
        if (inputAnio.value.length !== 0) {
            url += '&year_published=' + inputAnio.value;
            filtroAnio = true;
        }
        if(idEditorial !== undefined){
            url += '&primary_publisher' + idEditorial;
            filtroEditorial =true;
        }
        if(idAutores !== undefined){
            url += '&designers=' + idAutores;
            filtroAutores=true;
        }

        fetch(url)
            .then(function (response) {
                return response.json();
            })

            .then(function (myJson) {
                // Cogemos la cajaJuegos de la "pagina1html"

                let veces;
                if(filtroNombre){
                    veces=1;
                }
                
                if(filtroAnio){
                    veces=5;
                }


                for (let i = 0; i< veces;i++ ){

               let cajaJuegos=document.getElementById('datosjuego');
               let row = document.createElement('div');
               row.setAttribute('class','row justify-content-around');
               cajaJuegos.appendChild(row);
               let cajaelementos1 = document.createElement('div');
               cajaelementos1.setAttribute('class','cajaelementos1 col-5');
                 row.appendChild(cajaelementos1);
                 let cajaelementos2 = document.createElement('div');
               cajaelementos2.setAttribute('class','cajaelementos2 col-5');
             row.appendChild(cajaelementos2);
             
                // let cajaelementos1 = document.getElementById('cajaelementos1');
                // let cajaelementos2 = document.getElementById('cajaelementos2');
                cajaJuegos.style.padding = '2%';
                cajaJuegos.style.border = '4px outset green';
                cajaelementos1.style.padding = '2%';
                cajaelementos1.style.border = '2px solid green';
                cajaelementos2.style.padding = '2%';
                cajaelementos2.style.border = '2px solid green';
                
                
                
                //Nombre
                let nombre = document.createElement('p')
                nombre.setAttribute('class', 'nombre');
                nombre.innerHTML = myJson.games[i].name;
                cajaelementos1.appendChild(nombre);
                
                //Año de Publicacion
                let aniopublicacion = document.createElement('p');
                aniopublicacion.setAttribute('class', 'aniopublicacion');
                aniopublicacion.innerHTML = "Año de Publicacion - " + myJson.games[i].year_published;
                cajaelementos1.appendChild(aniopublicacion);
                
                // Editorial
                let editorial = document.createElement('p');
                editorial.setAttribute('class', 'editorial');
                editorial.innerHTML = "Editorial - " + myJson.games[i].primary_publisher;
                cajaelementos1.appendChild(editorial);

                //Diseñador

                let designer = document.createElement('p');
                designer.setAttribute('class', 'designer');
                designer.innerHTML = "Diseñador - " + myJson.games[i].designers;
                cajaelementos1.appendChild(designer);

                //Diseño Grafico

                let artist = document.createElement('p');
                artist.setAttribute('class', 'artist');
                artist.innerHTML = "Diseño Grafico - " + myJson.games[i].artists;
                cajaelementos1.appendChild(artist);
                
                
                //Edad Minima Recomendada
                
                let edadminima = document.createElement('p');
                edadminima.setAttribute('class', 'edadminima');
                edadminima.innerHTML = "Edad Minima Recomendada- " + myJson.games[i].min_age;
                cajaelementos1.appendChild(edadminima);
                
                //Minimo jugadores
                
                let minimojugadores = document.createElement('p');
                minimojugadores.setAttribute('class', 'minimojugadores');
                minimojugadores.innerHTML = "Minimo Jugadores- " + myJson.games[i].min_players;
                cajaelementos1.appendChild(minimojugadores);
                
                //Maximo jugadores
                
                let maximojugadores = document.createElement('p');
                maximojugadores.setAttribute('class', 'maximojugadores');
                maximojugadores.innerHTML = "Maximo Jugadores- " + myJson.games[i].max_players;
                cajaelementos1.appendChild(maximojugadores);
                
                //Duracion Minima de la Partida
                
                let duracionminima = document.createElement('p');
                duracionminima.setAttribute('class', 'maximojugadores');
                duracionminima.innerHTML = "Duracion Minima de la partida- " + myJson.games[i].min_playtime;
                cajaelementos1.appendChild(duracionminima);
                
                //Duracion Maxima de la Partida
                
                let duracionmaxima = document.createElement('p');
                duracionmaxima.setAttribute('class', 'maximojugadores');
                duracionmaxima.innerHTML = "Duracion Maxima de la partida- " + myJson.games[i].max_playtime;
                cajaelementos1.appendChild(duracionmaxima);
                
                
                //Reglas del juego (Link descarga)
                
                let reglas = document.createElement('p');
                reglas.setAttribute('class', 'reglas');
                reglas.innerHTML = ' <a href='+myJson.games[i].rules_url+'>Manual</a>'
                
                myJson.games[i].rules_url;
                cajaelementos1.appendChild(reglas);
                
                //Foto 
                
                let imagenjuego = document.createElement('img');
                imagenjuego.setAttribute('src', myJson.games[i].images.medium);
                imagenjuego.setAttribute('class', 'imagenjuego');
                cajaelementos2.appendChild(imagenjuego);
                
                
                // Descripcion
                
                let descripcion = document.createElement('p');
                descripcion.setAttribute('class', 'descripcion');
                descripcion.innerHTML = myJson.games[i].description;
                cajaelementos2.appendChild(descripcion);
                
                
                // Estos datos se agregan a la clase del body ("cajaJuegos") de la "pagina1.html" 
                // cajaJuegos.appendChild(cajaelementos1);
                // cajaJuegos.appendChild(cajaelementos2)
                
                
            }
            })

    }
})


//--------------------------------------------------------------------------------------------------

//UTILIZACION DE LOCALSTORAGE Y SESSIONSTORAGE PARA GUARDAR Y OBTENER DATOS (BOTON "Ver Busquedas Anteriores")

// Cogemos los Ids : boton, titulo,
juegosalmacenados = JSON.parse(localStorage.getItem("juegos"));
console.log(juegosalmacenados);
let botonpreferecias = document.getElementById('botonpreferencias');
let titulo = document.getElementById("titulopreferencias");
let cajainformacion = document.getElementById("informacion");
let listadopreferencias = document.getElementsByClassName("listadopreferencias");
//Creamos el titulo 
let hijosCaja = $('#informacion p');
console.log(hijosCaja);

titulo.innerHTML = "Preferencias de Usuaro";
function RellenarModal() {
    if (hijosCaja.length > 0) {
        $('#informacion p').each(function (parrafo) {
            parrafo.remove();
        })
    }
    for (let x = 0; x < juegosalmacenados.length; x ++) {
    
        // Body del Modal (Listado de preferencias) sacar Nombre
        let preferencianombre  =  document.createElement('p');
        preferencianombre.innerHTML ='Nombre' + juegosalmacenados[x].nombre
        
        // Body del Modal (Listado de preferencias) sacar Nombre
        let preferenciaanio  =  document.createElement('p');
        preferenciaanio.innerHTML ='Año' + juegosalmacenados[x].anio
        
        cajainformacion.appendChild(preferencianombre);
        cajainformacion.appendChild(preferenciaanio);
        
        }
}


// botonpreferencias.addEventListener('click', function () {
// let cajapreferencias = document.createElement('div') 
// .appendChild(cajapreferencias);
    
// })

  // Obtenemos o recogemos los valores
 // let busquedaRecogida2 = localStorage.getItem('inputName');
 //let busquedaRecogida = sessionStorage.getItem('inputName');
//----------------------------------------------------------------------------------------------------

// FETCH PARA SACAR LOS JUEGOS POR EDITORIAL 
// if ((inputNombre.value.length === 0 && inputAnio.value.length === 0 && idAutores == undefined && idEditorial == undefined) ) {
//     alert('ERROR!!! Tienes que introducir un NOMBRE o AÑO para iniciar la busqueda');

// } else {
   
//     let url1 = 'https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M&primary_publisher='+idEditorial;

//         fetch(url1)

//         .then(function(response){

//             return response.json();

//            })

//         .then(function(myJson2){


//             let cajaJuegos =  document.getElementById('datosjuego');
//             cajaJuegos.style.padding = '2%';
//             cajaJuegos.style.border = '4px outset green';

//             for (let z = 0; z < 5; z++) {
//               // Cogemos la cajaJuegos de la "pagina1html"


//               //Nombre
//               let nombre = document.createElement('p')
//               nombre.setAttribute('class', 'nombre');
//               nombre.innerHTML =  myJson2.games[z].name;

//               //Año de Publicacion
//               let aniopublicacion  =  document.createElement('p');
//               aniopublicacion.setAttribute('class', 'aniopublicacion');
//               aniopublicacion.innerHTML = "Año de Publicacion - "+ myJson2.games[z].year_published;

//               // Editorial
//               let editorial  =  document.createElement('p');
//               editorial.setAttribute('class', 'editorial');
//               editorial.innerHTML = "Editorial - "+ myJson2.games[z].primary_publisher;

//               //Diseñador

//               let designer  =  document.createElement('p');
//               designer.setAttribute('class', 'designer');
//               designer.innerHTML = "Diseñador - "+ myJson2.games[z].designers;

//               //Diseño Grafico

//               let artist  =  document.createElement('p');
//               artist.setAttribute('class', 'artist');
//               artist.innerHTML = "Diseño Grafico - "+ myJson2.games[z].artists;


//               //Edad Minima Recomendada

//               let edadminima  =  document.createElement('p');
//               edadminima.setAttribute('class', 'edadminima');
//               edadminima.innerHTML = "Edad Minima Recomendada- "+ myJson2.games[z].min_age;

//               //Minimo jugadores

//               let minimojugadores  =  document.createElement('p');
//               minimojugadores.setAttribute('class', 'minimojugadores');
//               minimojugadores.innerHTML = "Minimo Jugadores- "+ myJson2.games[z].min_players;

//               //Maximo jugadores

//               let maximojugadores  =  document.createElement('p');
//               maximojugadores.setAttribute('class', 'maximojugadores');
//               maximojugadores.innerHTML = "Maximo Jugadores- "+ myJson2.games[z].max_players;


//               //Foto 

//               let imagenjuego = document.createElement('img');
//               imagenjuego.setAttribute('class', 'imagenjuego');
//               imagenjuego.setAttribute('src', myJson2.games[z].images.medium);

//               // Descripcion

//               let descripcion  =  document.createElement('p');
//               descripcion.setAttribute('class', 'descripcion');
//               descripcion.innerHTML =  myJson2.games[z].description;



//               // Estos datos se agregan a la clase del body ("cajaJuegos") de la "pagina1.html" 
//               cajaJuegos.appendChild(nombre);
//               cajaJuegos.appendChild(aniopublicacion);
//               cajaJuegos.appendChild(editorial);
//               cajaJuegos.appendChild(designer);
//               cajaJuegos.appendChild(artist);
//               cajaJuegos.appendChild(edadminima);  
//               cajaJuegos.appendChild(minimojugadores); 
//               cajaJuegos.appendChild(maximojugadores);
//               cajaJuegos.appendChild(descripcion); 
//               cajaJuegos.appendChild(imagenjuego); 
//               cajaJuegos.appendChild (descripcion);

//              }
//         })  

// }
