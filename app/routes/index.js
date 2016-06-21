module.exports = function(app, db) {
    
    app.route("/api/imagesearch/:searchQuery").get(function(req, res) {
        var googleImages = require("google-images");
        var client = googleImages("000207175297153202558:1qwizkolefk", "AIzaSyAnX5qH5CS-kbaoS6J-e39ZwqRAaUYG5hk");
        var searchQuery = req.params.searchQuery;
        var offset = req.query.offset;
        var searchCollection = db.collection("imagesearch");
        console.log(offset);
	if(offset==undefined) {
        client.search(searchQuery).then(function (images) {
	    searchCollection.insert({"term": searchQuery, "when": new Date()});
            res.send(JSON.stringify(images));
        });
	}
	else {
	client.search(searchQuery, {page: parseInt(offset)}).then(function (images) {
	    searchCollection.insert({"term": searchQuery, "when": new Date()});
            res.send(JSON.stringify(images));
        });

	}
    });
    
    app.route("/api/latest/imagesearch/").get(function(req, res) {
        var searchCollection = db.collection("imagesearch");
        searchCollection.find({}, {"_id":false}).toArray(function(err, doc) {
            if(err) {
                throw new Error(err);
            }
            res.send(JSON.stringify(doc));
        })
    })
};
