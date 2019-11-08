
// Recojo los valores de la busqueda : precio, editorial y autor



let boton = document.getElementById('boton');
let gameId;



// Una vez que pulso el boton

boton.addEventListener('click', function () {

    let inputName = document.getElementById('name').value

   
    // Linea para borrar busquedas. Por Cortesia de "Raul"
    document.getElementById('datosjuego').innerHTML = "";

    if ((inputName.length === 0 ) ) {
        alert('ERROR!!! Tienes que introducir el juego para iniciar la busqueda');


    } else {
       

       // FETCH PARA MOSTRAR PRECIOS
       // Utilizo dos fetch 
      // 1. Para sacar todos los datos de un juego por nombre y de hay almacenar su id
     // 2. Almaceno ese ID y realizo un segundo fetch para sacar precio
       
     fetch('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M&name='+inputName)
     
    .then(function (response) {
        return response.json();
       
        })

    .then(function (myJson) {
          gameId = myJson.games[0].id;
          


          fetch('https://www.boardgameatlas.com/api/game/prices?game_id='+gameId+'&client_id=SB1VGnDv7M')

   

          .then(function (response) {
              return response.json();
          
          })
      
          .then(function (myJson) {
              console.log(myJson)
      
              for (let x = 0; x < myJson.prices.length; x++){
      
              
              let cajaJuegos = document.getElementById('datosjuego');
              let cajaUnitaria =document.createElement('div');
              
              cajaUnitaria.style.border = '2px solid green';
              cajaJuegos.style.padding = '2%';
              cajaJuegos.style.border = '4px outset green';
      
      
              //Nombre Tienda
              let nombretienda = document.createElement('p')
              nombretienda.setAttribute('class', 'nombretienda');
              nombretienda.innerHTML ="Tienda - " + myJson.prices[x].store_name;
              cajaUnitaria.appendChild(nombretienda);

              //Precio
              let precio = document.createElement('p');
              precio.setAttribute('class', 'precio');
              precio.innerHTML = "Precio - " + myJson.prices[x].price_text;
              cajaUnitaria.appendChild(precio);

              // Editorial
              let editorial = document.createElement('p');
              editorial.setAttribute('class', 'editorial');
              editorial.innerHTML = "Editorial - " + myJson.prices[x].updated_at;
              cajaUnitaria.appendChild(editorial);

              //Pais de la tienda
              let paistienda = document.createElement('p');
              paistienda.setAttribute('class', 'paistienda');
              paistienda.innerHTML = "Pais - " + myJson.prices[x].country;
              cajaUnitaria.appendChild(paistienda);
              
              cajaJuegos.appendChild(cajaUnitaria);
              
            
              
              }
          })




         
    })
    


    }
 })

