// VARIABLES
// -----------------------------------------------------
var buttonArray = ["The Academy Is...", "Cute Is What We Aim For", "Death Cab for Cutie", "Fall Out Boy", "The Fray", "Hawthorne Heights", "Matchbook Romance", "My Chemical Romance", "Panic! at the Disco", "Paramore", "Plain White T's", "The Red Jumpsuit Apparatus", "Saosin", "Say Anything", "Senses Fail", "Something Corporate", "Taking Back Sunday", "Thirty Seconds to Mars", "The Used", "Weezer"];

// -----------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------
function addButton(){
buttonArray.forEach(element => {
    var newButton = $("<button value="+element+" class='btn bandButton ml-2 mb-2'>").text(element);
    $("#buttonDiv").append(newButton);
});
};


$("body").on("click", ".bandButton", function(evt){
    var band = $(evt).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ band +"&api_key=DqteY7DkZT5G9EtFgZoS3gOp5Ol7sSFD";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
            console.log(response);
})
});

// -----------------------------------------------------
// MAIN 
// -----------------------------------------------------
addButton();
