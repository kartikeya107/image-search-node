'use strict';
var mongo = require("mongodb");
var mongoClient = mongo.MongoClient;
var express = require('express');
var routes = require('./app/routes/index.js');
var app = express();

mongoClient.connect("mongodb://localhost:27017/imagesearch", function(err, db) {
        if(err) throw err;
        app.use("/public", express.static(process.cwd()+"/public"));

        routes(app,db);
        
//	var port = server.listen(process.env.PORT || 3000);
        app.listen(8080, function(){
        console.log("listening on port "+ process.env.PORT);
        });

});

