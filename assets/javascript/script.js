// VARIABLES
// -----------------------------------------------------
var buttonArray = ["The Academy Is...", "Cute Is What We Aim For", "Death Cab for Cutie", "Fall Out Boy", "The Fray", "Hawthorne Heights", "Matchbook Romance", "My Chemical Romance", "Panic! at the Disco", "Paramore", "Plain White T's", "The Red Jumpsuit Apparatus", "Saosin", "Say Anything", "Senses Fail", "Something Corporate", "Taking Back Sunday", "Thirty Seconds to Mars", "The Used", "Weezer"];

// -----------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------
function addButton() {
    buttonArray.forEach(element => {
        var newButton = $("<button value=" + element + " class='btn bandButton ml-2 mb-2'>").text(element);
        $("#buttonDiv").append(newButton);
    });
};


// -----------------------------------------------------
// MAIN 
// -----------------------------------------------------
addButton();


$("body").on("click", ".bandButton", function () {
    var band = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + band + "'&limit=10&api_key=DqteY7DkZT5G9EtFgZoS3gOp5Ol7sSFD";

    $("#gifDiv").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            results.forEach(element => {
                var oneGifDiv = $("<div class='oneGifDiv mb-3 col-6'>");
                var p = $("<p>").text("Rating: " + element.rating);
                var bandImage = $("<img class='gif' data-state='still' data-still='"+element.images.fixed_height_still.url+"' data-animate='"+element.images.fixed_height.url+"'>");
                bandImage.attr("src", element.images.fixed_height_still.url);
                oneGifDiv.append(p);
                oneGifDiv.append(bandImage);
                $("#gifDiv").prepend(oneGifDiv);
            })

        })
});

$('#addBandButton').click(function(){
    if ($("#gifButton").val()){
    var newBandButton = $("#gifButton").val();
    buttonArray.push(newBandButton);
    $("#buttonDiv").empty();
    addButton();
}});

$(".oneGifDiv").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
