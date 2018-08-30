// Initial array of gifs
var gifs = ["leslie knope", "tom haverford", "donna meagle", "ben wyatt", "april ludgate", "andy dwyer"];

function renderButtons() {

  $("#buttons-appear").empty(); // avoid dupes

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");

    a.addClass("gif-btn");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-appear").append(a);
    console.log(a);
  }
}

// $(document).on("click", ".gif-btn", showMeGif);
$(document).ready(function(){

  renderButtons();
  $("body").on("click","#add-gif" ,function(event) { //when button gets clicked...
    event.preventDefault();
    var newGif = $("#gif-input").val().trim();
    gifs.push(newGif);
    renderButtons(); //cycling through array again, no dupes, make new button
  });


  $("body").on("click",".gif-btn", function() {

    var gif = $(this).attr("data-name");
    console.log(gif);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=ZyxT832NSIkv6I3IPQ0DKZ2nipbpdpFj&limit=5";
    
    
    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='gif'>");}
              
              }; //endfor
      var rating = results[i].rating; //rating from JSON
      var pOne = $("<p>").text("Rating: " + rating); //create p element where rating will appear

      gifDiv.append(pOne); //add rating to the gif div

      var imgURL = response.Poster; //URL for the image

      var image = $("<img>").attr("src", imgURL); //create img element, image will go here
      gifDiv.append(image);

      $("#gifs-appear").prepend(GifDiv);
              }) //end .then

  }); //end button on click
})//end ready
