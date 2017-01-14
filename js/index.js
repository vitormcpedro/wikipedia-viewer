function searchWikipedia(query) {
  
  var apiUrl = "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrnamespace=0&gsrsearch=" + encodeURIComponent(query) + "&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&format=json&callback=?";
 
  
  $.getJSON(apiUrl, function(json) {
    var apiResult = JSON.stringify(json);
    console.log("Wikipedia API result: " + apiResult);
    
    if(!json.hasOwnProperty("query") || !json.query.hasOwnProperty("pages")) {
      $(".search-results").html("");
      $(".message").html("<div class='alert alert-danger' role='alert'>No results found.</div>");
    } else {
      
      $(".message").html("");
      
      var resultsList = Object.keys(json.query.pages).map(function (key) {
        return json.query.pages[key]; 
      });
    
      var html = "";

      resultsList.forEach(function(val) {
        html += "<a href='https://en.wikipedia.org/?curid=" + val.pageid + "' target='_blank' class='list-group-item text-left'>";
        html += "<h4 class='list-group-item-heading'>" + val.title + "</h4>";
        html += "<p class='list-group-item-text'>" + val.extract + "</p>";
        html += "</a>";
        html += "<div class='spacer'></div>";
      });

      $(".search-results").html(html);
    }
  
  });
}


$(document).ready(function() {
});

$("#searchField").keyup(function(event){
    if(event.keyCode == 13){
      searchWikipedia($("#searchField").val());
    }
});

$( "#searchField" ).focus(function() {
  $('.searchBox').css('width','300px');
});

$( "#searchField" ).focusout(function() {
  $('.searchBox').css('width','210px');
});