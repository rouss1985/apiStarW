$(document).foundation();
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
         paintFilms(data);
         $(".respuesta").html('¡Estas listo para viajar a una galaxia muy lejana...!');
       },
       fail: function(jqXHR, textStatus, errorThrown){
         $(".respuesta").html('Hubo un error al llamar a la API. Error: '+ errorThrown);
       }
    });
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
            template +=`<li>${character}</li>`;
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
