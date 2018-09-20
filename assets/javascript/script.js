// VARIABLES
// -----------------------------------------------------
var topics = ["The Academy Is...", "Cute Is What We Aim For", "Death Cab for Cutie", "Fall Out Boy", "The Fray", "Hawthorne Heights", "Matchbook Romance", "My Chemical Romance", "Panic! at the Disco", "Paramore", "Plain White T's", "The Red Jumpsuit Apparatus", "Saosin", "Say Anything", "Senses Fail", "Something Corporate", "Taking Back Sunday", "Thirty Seconds to Mars", "The Used", "Weezer"];

if (!(localStorage.getItem("favButtonStorage") === null)) {
    var favTopics = [localStorage.getItem("favButtonStorage").split(",")];
} 
else {
    var favTopics = [[]];
};

// var favTopics = [];

var topicsLower = $.map(topics, function (n, i) {
    return (n.toLowerCase());
});

var favorites = [];

// -----------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------
function addButton(arr, div, classStr) {
    div.empty();
    arr.forEach(element => {
        var newButton = $("<button value=" + element + " class='btn ml-2 mb-2'>")
        newButton.addClass(classStr).text(element);
        div.append(newButton);
    });
};


// -----------------------------------------------------
// MAIN 
// -----------------------------------------------------
addButton(topics, $("#buttonDiv"), "bandButton");


$("body").on("click", ".bandButton", function () {
    var band = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + band + "'&limit=10&api_key=DqteY7DkZT5G9EtFgZoS3gOp5Ol7sSFD&rating=g";

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
                var oneGifDiv = $("<div class='oneGif mb-3 col-12 col-md-6 text-center'>");
                var wellDiv = $("<div class='card card-block bg-faded col-12 col-md-6 px-2 py-1 mx-auto'>");
                var p1 = $("<p class='mt-1 mb-1'>").html("<span class='darkLight'>Rating: " + element.rating + "</span>");
                var p2 = $("<p class='mb-1'>").html("<span class='darkLight'>Import Date/Time: " + element.import_datetime + "</span>");
                var p3 = $("<p class='mb-1'>").html("<span class='darkLight'>Trending Date/Time: " + element.trending_datetime + "</span>");
                var downloadLink = $("<a href='" + element.images.fixed_height.url + "' download target='_blank'>");
                var dloadButton = $("<button class='btn downloadButton'>").text('Download');
                console.log(element.images.fixed_height.url);
                // $('body').on('click', '.downloadButton', function () {
                //     window.open(element.images.fixed_height.url);
                // })
                var dloadUnit = downloadLink.append(dloadButton);
                var bandImage = $("<img class='gif' data-state='still' data-still='" + element.images.fixed_height_still.url + "' data-animate='" + element.images.fixed_height.url + "'>");
                bandImage.attr("src", element.images.fixed_height_still.url);
                oneGifDiv.append(bandImage);
                wellDiv.append(p1);
                wellDiv.append(p2);
                wellDiv.append(p3);
                oneGifDiv.append(wellDiv);
                wellDiv.append(dloadUnit);
                $("#gifDiv").prepend(oneGifDiv);
            })

        })
});


$('#addBandButton').click(function () {

    if ($("#gifButtonInput").val()) {
        if ($.inArray($("#gifButtonInput").val().toLowerCase(), topicsLower) === -1) {
            var newBandButton = $("#gifButtonInput").val();
            topics.push(newBandButton);
            $("#buttonDiv").empty();
            $("#gifButtonInput").val("");
            addButton(topics, $("#buttonDiv"), "bandButton");
        }
        else {
            $("#gifButtonInput").val("");
        }
    }

});

$("body").on("click", ".bandButton1", function () {
    var band = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + band + "'&limit=10&api_key=DqteY7DkZT5G9EtFgZoS3gOp5Ol7sSFD&rating=g";

    $("#favGifs").empty();

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
                var oneGifDiv = $("<div class='oneGif mb-3 col-12 col-md-6 text-center'>");
                var wellDiv = $("<div class='card card-block bg-faded col-12 col-md-6 px-2 py-1 mx-auto'>");
                var p1 = $("<p class='mt-1 mb-1'>").html("<span class='darkLight'>Rating: " + element.rating + "</span>");
                var p2 = $("<p class='mb-1'>").html("<span class='darkLight'>Import Date/Time: " + element.import_datetime + "</span>");
                var p3 = $("<p class='mb-1'>").html("<span class='darkLight'>Trending Date/Time: " + element.trending_datetime + "</span>");
                var downloadLink = $("<a href='" + element.images.fixed_height.url + "' download target='_blank'>");
                var dloadButton = $("<button class='btn downloadButton'>").text('Download');
                console.log(element.images.fixed_height.url);
                // $('body').on('click', '.downloadButton', function () {
                //     window.open(element.images.fixed_height.url);
                // })
                var dloadUnit = downloadLink.append(dloadButton);
                var bandImage = $("<img class='gif' data-state='still' data-still='" + element.images.fixed_height_still.url + "' data-animate='" + element.images.fixed_height.url + "'>");
                bandImage.attr("src", element.images.fixed_height_still.url);
                oneGifDiv.append(bandImage);
                wellDiv.append(p1);
                wellDiv.append(p2);
                wellDiv.append(p3);
                oneGifDiv.append(wellDiv);
                wellDiv.append(dloadUnit);
                $("#favGifs").prepend(oneGifDiv);
            })

        })
});


$('#faveButton').click(function (e) {
    e.preventDefault();

    // Every time Add Favorite is pressed, favTopics array is populated with items from local storage


    if (!(favTopics[0] === null) && !(favTopics[0] === undefined)) {
        var favTopicsLower = $.map(favTopics[0], function (n, i) {
            // favTopics = [localStorage.getItem("favButtonStorage")];
            return (n.toLowerCase());
        });
    }


    if ($("#addFavoriteInput").val()) {
        if ($.inArray($("#addFavoriteInput").val().toLowerCase(), favTopicsLower) === -1) {
            var newBandButton = $("#addFavoriteInput").val();
            favTopics[0].push(newBandButton);
            // $("#favButtonDiv").empty();
            $("#addFavoriteInput").val("");
            // var favArray = Array.from(favTopics.values());
            $("#favButtonDiv").empty();
            addButton(favTopics[0], $("#favButtonDiv"), "bandButton1");
            localStorage.setItem("favButtonStorage", favTopics);
            // $("#favButtonDiv").text(localStorage.getItem("favButtonStorage"));
        }
        else {
            $("#addFavoriteInput").val("");
        }
    }


});

// $("#favButtonDiv").text(localStorage.getItem("favButtonStorage"));
addButton(favTopics[0], $("#favButtonDiv"), "bandButton1");

$("body").on("click", ".gif", function () {
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

/* 

Allow users to request additional gifs to be added to the page.

Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

Allow users to add their favorite gifs to a favorites section.

This should persist even when they select or add a new topic.
If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies). */