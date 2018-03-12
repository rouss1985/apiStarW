$(document).foundation();
let imagenes = {
    "images":[
    {
        "var": "https://swapi.co/api/people/1/",
        "img":"https://vignette.wikia.nocookie.net/es.starwars/images/d/d9/Luke-rotjpromo.jpg/revision/latest/scale-to-width-down/350?cb=20071214134433"
    },
    {
        "var": "https://swapi.co/api/people/2/",
        "img":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnrR87oYXdijnMceZ0dzqKCe0EOMXJHAXWI_7sd1XJCiBBiMoALA"
    },
    {
        "var": "https://swapi.co/api/people/3/",
        "img":"https://starwarslovers.es/wp-content/uploads/2017/11/R2-D2-200x300.jpg"
    },
    {
        "var": "https://swapi.co/api/people/4/",
        "img":"https://i1.wp.com/MynockManor.com/wp-content/uploads/2018/02/Darth-Vader-Dark-Lord-of-the-Sith-12.jpg"
    },
    {
        "var": "https://swapi.co/api/people/5/",
        "img":"https://i.ebayimg.com/images/g/qnwAAOSw~xFZiwux/s-l300.jpg"
    },
    {
        "var": "https://swapi.co/api/people/6/",
        "img":"https://justinnovelli.files.wordpress.com/2017/03/owen-lars-3_ffd24999.jpeg?w=236&h=236&crop=1"
    },
    {
        "var": "https://swapi.co/api/people/7/",
        "img":"https://i.pinimg.com/originals/f0/3c/66/f03c66dc4bb023d2c5e7e9dcd74b1b04.jpg"
    },
    {
        "var": "https://swapi.co/api/people/8/",
        "img":"https://i.ebayimg.com/images/i/302484934768-0-1/s-l1000.jpg"
    },
    {
        "var": "https://swapi.co/api/people/9/",
        "img":"https://cdn.movieweb.com/img.news.tops/NEhZffADgBhzko_2_c/Star-Wars-Rogue-One-Diego-Luna-Biggs-Darklighter.jpg"
    }
]}


datos = '';
$(document).ready(function(){
    $.ajax({
       type: "GET",
       dataType: "json",
       cache: true,
       url: "https://swapi.co/api/films/?format=json",
       beforeSend: function(){
           $(".respuesta").html('Esperando respuesta...');
       },
       success: function(data){
           datos=data;
         paintFilms(data);
         $(".respuesta").html('¡Estas listo para viajar a una galaxia muy lejana...!');
       },
       fail: function(jqXHR, textStatus, errorThrown){
         $(".respuesta").html('Hubo un error al llamar a la API. Error: '+ errorThrown);
       }
    });

    //el click para abrir el modal
    //contenedor del ajax ->  evento -> selector al que le voy a dar click
    $("#pelis").on('click', '.personajesw',function(){
        var url = $(this).attr('data-url');
        modalcont(url);
        $('#modal').foundation('open');
    });


    const modalcont = url =>{
        let modal = document.getElementById('contmodal');

        $.ajax({
           type: "GET",
           dataType: "json",
           cache: true,
           url: url,
           beforeSend: function(){
               modal.innerHTML='Esperando respuesta...';
           },
           success: function(data){
               //modelo array->prototype->filter
               let imgPersonaje = imagenes.images.filter(function(obj){
                   if(obj.var==url){return obj;}
               });
               console.log(imgPersonaje);
               let template= '';

               template+=`
                     <div id=modal>
                         <h2>Nombre: ${data.name}</h2>
                         <img src="${imgPersonaje[0].img}">
                         <p>Height: ${data.height} </p>
                         <p>Masa: ${data.mass} </p>
                         <p>Color de cabello: ${data.hair_color}</p>
                         <p>Año de nacimiento: ${data.birth_year}</p>
                         <p>Creado en: ${data.created}</p>
                     </div>`;
               modal.innerHTML=template;
           },
           fail: function(jqXHR, textStatus, errorThrown){
             $(".respuesta").html('Hubo un error al llamar a la API. Error: '+ errorThrown);
           }
        });



    }



});

const paintFilms = films =>{
  let template = ``;
  $.each(films.results,function(key,film){

    template +=`
    <div class="film"
      <p class="title1">Name: ${film.title}</p>
      <p class="episode">Episodio id: ${film.episode_id}</p>
      <p class="character">Characters: </p>
      <ul>`;
        $.each(film.characters,function(key, character){
            template +=`<li><a href="javascript:void(0)" data-url="${character}" class="personajesw">${character}</a></li>`;
        });
        template +=`</ul></div>`;
  });
  $("#pelis").append(template);
}

const personaje = url =>{
    let temp =``;

    $.ajax({
       type: "GET",
       dataType: "json",
       cache: true,
       url: url,
       success: function(data){
         console.log(data);
         temp=`<li>${data.name}</li>`;
         $("#pelis").append(temp);
       }
     });
}
