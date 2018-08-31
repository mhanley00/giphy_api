// Initial array of gifs
var topics = ["leslie knope", "tom haverford", "donna meagle", "ben wyatt", "april ludgate", "andy dwyer"];

function renderButtons() {

  $("#buttons-appear").empty(); // avoid dupes

  for (var i = 0; i < topics.length; i++) {
    var a = $("<button>");

    a.addClass("gif-btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-appear").append(a);
  }
}

// $(document).on("click", ".gif-btn", showMeGif);
$(document).ready(function(){

  renderButtons();
  $("body").on("click","#add-gif" ,function(event) { //when button gets clicked...
    event.preventDefault();
    var newGif = $("#gif-input").val().trim();
    topics.push(newGif);
    renderButtons(); //cycling through array again, no dupes, make new button
  });


  $("body").on("click",".gif-btn", function() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ gif +"&api_key=ZyxT832NSIkv6I3IPQ0DKZ2nipbpdpFj&limit=10";
    
    
    // Creating an AJAX call for the specific gif button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
              var gifDiv = $("<div class='gif'>");
              
             
      var rating = response.data[i].rating; //rating from JSON
      var pOne = $("<p>").text("Rating: " + rating); //create p element where rating will appear

      gifDiv.append(pOne); //add rating to the gif div

      var image = $("<img>");
      // image.attr("src", response.data[i].images.fixed_height.url); change to this if want gifs to play automatically
      image.attr("src", response.data[i].images.fixed_height_small_still.url);
      image.attr("data-still", response.data[i].images.fixed_height_small_still.url); 
      image.attr("data-play", response.data[i].images.fixed_height_small.url); 
      image.attr("data-state", "still"); 

      gifDiv.append(image);

      $("#gifs-appear").prepend(gifDiv);
    }; //endfor
              }) //end .then
  $("body").on("click", "img", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-play"));
      $(this).attr("data-state", "play");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  }); //end button on click
})//end ready
