var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var request = require('request');
var Search = require('bing.search');
var util = require('util');
var Bing = require('node-bing-api')({ accKey:"64VDtCsOowlRAOFN0c0/Il+qI4/idnMsnqXRCvkwp0g" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var recentSearches=[];

app.get('/api/imagesearch/:search',function(req,res){
  var search = req.params.search;
  var offset = req.query.offset;
  var d = new Date();
  var date = d.toJSON();
  var query = {
    "term":search,
    "time":date
  };

  recentSearches.push(query);

  var result;
  search2 = new Search('64VDtCsOowlRAOFN0c0/Il+qI4/idnMsnqXRCvkwp0g');
 search2.images(search,
  {top: offset},
  function(err, results) {
    console.log(offset);
    res.send(results.map(images));
  }
);

});

app.get('/api/latest/imagesearch', function(req,res){
    res.send(JSON.stringify(recentSearches));
});


  function images(img) {
    // Construct object from the json result
    return {
      "url": img.url,
      "snippet": img.title,
      "thumbnail":img.thumbnail.url,
      "width":img.width,
      "height":img.height
    };
  }
  

var port = Number(process.env.PORT || 3000);
app.listen(port, function(){
  console.log("Server running on Port: "+port);
});