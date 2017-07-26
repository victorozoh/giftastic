$(document).ready(function(){
  var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
                "bird","ferret", "turtle", "sugar glider", "chinchilla",
                "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
                "salamander", "frog", "teacup pig"];

  // create buttons and append to the page
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.attr("data-animal", topics[i]);
    newButton.text(topics[i]);
    $(".animalButtons").prepend(newButton);
  }

  // add a new button when user clicks the submit button
  $("#addAnimal").on("click", function() {
    event.preventDefault();
    var newButton = $("<button>");
    newButton.attr("data-animal", $("#animal-input").val().trim());
    newButton.text($("#animal-input").val().trim());
    $(".animalButtons").prepend(newButton);
  });

  // display gifs when user clicks on the animal Button
  $(document).on("click", "button",function() {
    $("#animalGifs").empty();
    var animal = $(this).attr("data-animal");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

      console.log(response);
      // Step 2: since the image information is inside of the data key,
      // make a variable named results and set it equal to response.data

      // =============== put step 2 in between these dashes ==================
      var results = response.data;
      // ========================

      for (var i = 0; i < results.length; i++) {

        var animalDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalImage.attr("class", "gif");
        animalImage.attr("data-state",'animate');
        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
        animalImage.attr("data-animate", results[i].images.fixed_height.url);

        animalDiv.prepend(p);
        animalDiv.prepend(animalImage);

        $("#animalGifs").prepend(animalDiv);
        // ==================================
      }// end of for loop

    }); // end of ajax call
  });// end of button click event

  // pausing and playing when user clicks on the gif
  $(document).on("click", ".gif" ,function() {
    var state = $(this).attr("data-state");
    // =============================================

    if  (state === 'still'){
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state",'animate');
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state",'still');
    }

  });// end of gif pause and play event

});// end of document.ready function
