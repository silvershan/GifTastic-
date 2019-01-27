var topics = [
    "Joseph Gordon Levitt",
    "Bradley Cooper",
    "Tom Hanks",
    "Leonardo DiCaprio",
    "Morgan Freeman",
    "Harrison Ford",
    "Robin Williams"
];

var endpoint  = "https://api.giphy.com/v1/gifs/search";
var gifyAPI   = "3dbda82bd99349bf858085e01f35bbcc";
var limit     = 10;
var rating    = "g";


function renderButtons(renderLast) {
  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var b = $("<button>");
    $(b).addClass("topic btn btn-primary");
    $(b).html(topics[i]);
    $(".buttons").append(b);
  }

  $(".topic").click(function() {
    fetchGifs(this);
  });

  if (renderLast) {
    fetchGifs(".topic:last");
  }
}

function fetchGifs(topic) {
 
  $(".buttons .active").removeClass("active");
  $(topic).addClass("active");
  
  query = {
    "api_key"   : gifyAPI,
    "q"         : $(topic).html(),
    "limit"     : limit,
    "rating"    : rating
  };
  query = $.param(query);
  path = endpoint + "?" + query;
 
  $.ajax({
    url: path,
    type: 'GET',
  })
  .done(function(response) {
    
    $(".card-columns").empty();
    
    var gifArray = response.data;
    for (var i = 0; i < gifArray.length; i++) {
     
      var imgSrc = gifArray[i].images.downsized_still.url;
      var imgLink = gifArray[i].url;
      var embedLink = gifArray[i].embed_url;
      
      var card = [
        "<div class='card'>",
        "<img class='card-img-top' src='"+imgSrc+"'>",
        "<div class='card-footer card-inverse text-muted'>Rating: "+gifArray[i].rating.toUpperCase(),
        "</div>",
        "</div>"
      ];
    
      $(".card-columns").prepend(card.join(''));
    }
  })
  .fail(function() {
    console.log("error");
  });
}

function togglePlay(card) {

  var imgPath = $(card).attr("src");
  
  if (imgPath.endsWith("_s.gif")) {
    imgPath = imgPath.replace("_s.gif", ".gif");
  } else {
    imgPath = imgPath.replace(".gif", "_s.gif");
  }
  
  $(card).attr("src", imgPath);

}

$(document).ready(function() {

  renderButtons();

  $(".rating label").change(function(event) {
    rating = $(this).text().trim().toLowerCase();
  });

  
  $("#form").submit(function(event) {
    event.preventDefault();
    
  });

  $("#add-actor").on("click", function(){
    newTopic = $("#actors").val().trim();
    if(newTopic !== "") {
      topics.push($("#actors").val().trim());
      renderButtons(true);
    }
  });

  $(".gifs").on("click", ".card-img-top", function() {
    togglePlay(this);
  });

  $(".gifs").on("click", ".clip", function(event) {
    event.preventDefault();
  });
});

