//1-  Obtener de la API de BoardGameAtlas (disponible en https://www.boardgameatlas.com/api/)
// -Nombre del juego (name)
// -Editorial: (primary_published)
// - Año de publicacion (year_published)
// - Edad minima para jugarlo (min_age)
// - Foto del juego (img_url)
 





 fetch('https://www.boardgameatlas.com/api/search?client_id=SB1VGnDv7M')
 .then(function(response){
      return response.json();
     
     })
 
  .then(function(myJson){
      // Creamos los arrays que luego recorremos con el siguiente for

      let imagenes = document.getElementsByClassName("imgboardgame");
      let titulo = document.getElementsByClassName("tituloModal");
      let informacion = document.getElementsByClassName("informacion");
 
      let videos =['<iframe width="250" height="150" src="https://www.youtube.com/embed/SCfjYr9-T4I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/0V1X6gGFHno" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/htu5gtHmzUg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/15BAKiEVnck" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/2huHeo9zBaE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/zqhMh7nhQCQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/4Js1B57jZ7s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/lvL2sG4xqOA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                   '<iframe width="250" height="150" src="https://www.youtube.com/embed/iPXNiwLqvjI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']
 
    for (let x = 0; x < 9; x++) {
        // Ponemos las imagenes de los juegos en la pagina
        imagenes[x].setAttribute('src', myJson.games[x].images.small);

        // Ponemos el titulo en los modal
        titulo[x].innerHTML = myJson.games[x].name;

        // Creamos "p" y ponemos la Editorial que distribuye el juego
        let editorial  =  document.createElement('p');
        editorial.innerHTML = "Editorial - "+ myJson.games[x].primary_publisher;

        // Creamos "p" y ponemos el Año de publicacion del juego
        let aniopublicacion  =  document.createElement('p');
        aniopublicacion.innerHTML = "Año de Publicacion - "+ myJson.games[x].year_published;

        // Creamos "p" y ponemos la edad minimima recomendada para juagar al juego
        let edadminima  =  document.createElement('p');
        edadminima.innerHTML = "Edad Minima (Recomendada) - "+ myJson.games[x].min_age;

        // Creamos un "button" para mas informacion
        let boton = document.createElement('button');
        boton.innerHTML = " + Informacion ";

         boton.addEventListener('click',function() {
         let cajaVideo = document.createElement('div')
         cajaVideo.innerHTML = videos[x];
         informacion[x].appendChild(cajaVideo);
         this.remove(); // Cuando pinchas el boton "+ Informacion" este desapare y da paso al video
         })

        informacion[x].appendChild(editorial);
        informacion[x].appendChild(aniopublicacion);
        informacion[x].appendChild(edadminima);
        informacion[x].appendChild(boton);

        
    }
        
}) 


    
   
 
    