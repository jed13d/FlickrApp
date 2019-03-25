$(document).ready(function() {
   var options = {                                          // options used to send to flickr
      "method": "flickr.photos.search",
      "api_key": "",
      "text": "",
      "safe_search": "1",
      "per_page": "25",
      "page": "1",
      "format": "json",
      "nojsoncallback": "1"
   };
   var data;

   $("#flickr_form").submit(function(event){
      event.preventDefault();

      var url = "https://api.flickr.com/services/rest/?";   // url 'header'

      options.text = $("#flickrSrchTxt").val();             // get user search text

      $.each(options, function(key, value){                 // create total url from options for flickr request
         url += "&" + key + "=" + value;
      });

      $("#photoAlbum").scrollTop(0);                        // reset to top of element each new search

      //console.log(url);                       // debugging

      $.getJSON(url).always(function(data){                 // JSON request from flickr
         //console.log("getJSON complete");     // debugging

         $.each(data.photos.photo, function(i, item){       // obtain and present images from json result
            src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg";
            //console.log(src);
            imID = "#img" + i;
            //console.log(imID);
            $(imID).attr("src", src);
            if( i == 25 ) return false;
         });
      });

   });
});
