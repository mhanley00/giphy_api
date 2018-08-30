// Initial array of gifs
var gifs = ["leslie knope", "tom haverford", "donna meagle", "ben wyatt", "april ludgate", "andy dwyer"];

function showMeGif() { //ajax call to giphy

  var gif = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=ZyxT832NSIkv6I3IPQ0DKZ2nipbpdpFj&limit=5";

  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    var gifDiv = $("<div class='gif'>"); //gif goes in this div

    var rating = response.Rated; //rating from JSON

    var pOne = $("<p>").text("Rating: " + rating); //create p element where rating will appear

    gifDiv.append(pOne); //add rating to the gif div

    var imgURL = response.Poster; //URL for the image

    var image = $("<img>").attr("src", imgURL); //create img element, image will go here
    gifDiv.append(image);

    $("#gifs-appear").prepend(GifDiv);
  });

}

function renderButtons() {

  $("#buttons-appear").empty(); // avoid dupes

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");

    a.addClass("gif-btn");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-appear").append(a);
  }
}

$("#add-gif").on("click", function(event) { //when button gets clicked...
  event.preventDefault();
  var newGif = $("#gif-input").val().trim();

  gifs.push(gif);
  renderButtons(); //cycling through array again, no dupes, make new button
});

$(document).on("click", ".gif-btn", showMeGif);

renderButtons();