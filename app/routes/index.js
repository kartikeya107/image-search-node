module.exports = function(app) {
    
    app.route("/api/imagesearch/:searchQuery").get(function(req, res) {
        var googleImages = require("google-images");
        var client = googleImages("000207175297153202558:1qwizkolefk", "AIzaSyAnX5qH5CS-kbaoS6J-e39ZwqRAaUYG5hk");
        var searchQuery = req.params.searchQuery;
        //var offset = req.query.offset;
        console.log(req.query);
        client.search(searchQuery).then(function (images) {
            res.send(JSON.stringify(images));
        });
    });
};
