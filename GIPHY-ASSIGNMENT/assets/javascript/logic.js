var breeds = ["Doberman", "Schnauzer", "Pit Bull", "Poodle", "Black Labrador"];

function renderButtons() {

    $("#dog-view").empty(); 

    for (var i = 0; i < breeds.length; i++) {
        var button = $('<button>');
        button.text(breeds[i]);
        button.addClass("dogs");
        button.addClass("btn btn-primary");
        button.addClass("ml-2");
        button.addClass("mt-2")

        $("#dog-view").append(button);   
    }
}

function playStopGifs() {  


    var stillGif = $(this).attr("data-name-1");
    var movingGif = $(this).attr("data-name-2");

    if ($(this).attr("src") == stillGif) {
        $(this).attr("src", movingGif)
    }
    else if ($(this).attr("src") == movingGif) {
        $(this).attr("src", stillGif)
    }


}

function showDogs() {
    var breed = $(this).text();
    $("#dog-gifs").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=THl5OhDrKR3D0ABoY3RHg8f7VMusLuQ7&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var appendRow;
        for (var i = 0; i < response.data.length; i++) {

            if (i == 0 || (i) % 3 == 0)  
            {
                appendRow = $("<div class='row'></div>").appendTo("#dog-gifs");
            }

            var temp = response.data[i];
            console.log(response)

            var colBS = $("<div class='col-sm'>  </div>").appendTo(appendRow); 

            var stillGifUrl = (temp.images["fixed_height_still"].url).replace(/^http:\/\//i, 'https://');;
            var movingGifUrl = (temp.images["fixed_height"].url).replace(/^http:\/\//i, 'https://');

            var animalDiv = $("<Div>");
            var p = $("<p>")
            p.text(temp.rating);
            var img = $('<img />');
            img.attr("src", stillGifUrl);               
            img.attr("data-name-1", stillGifUrl);    
            img.attr("data-name-2", movingGifUrl);
            img.addClass("dogGifs");

            animalDiv.append(p);
            animalDiv.append(img);

            colBS.append(animalDiv); 
        }

    });
};

$("#add-dog-breed").on("click", function (event) {   
    event.preventDefault();
    var dog = $("#dog-input").val().trim();
    if (dog != "") {
        breeds.push(dog);               
    }

    $("#dog-input").val("");

   
    renderButtons();
});

$(document).on("click", ".dogs", showDogs);    
$(document).on("click", ".dogGifs", playStopGifs);
renderButtons();
