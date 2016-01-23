Meteor.publish('books', function() {
  return Books.find();
});

Meteor.publish("readings", function () {
    return Readings.find({
      owner: this.userId
    });
});

Meteor.publish('booksSearch', function(query) {
  var self = this;

    var response = HTTP.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        printType: "books",
        // projection: "lite",
        langRestrict: "fr"
      }
    });

    _.each(response.data.items, function(item) {
      var vol = item.volumeInfo;
      var volIsbn = findISBN(vol);

      if (item.volumeInfo.authors && volIsbn){
        var doc = {
          title: vol.title,
          subtitle: vol.subtitle && vol.subtitle.capitalizeFirstLetter(),
          authors: vol.authors,
          editor: vol.publisher,
          edityear: vol.publishedDate && (new Date(vol.publishedDate)).getFullYear(),
          isbn: volIsbn,
          pages: vol.pageCount,
          thumb: vol.imageLinks && item.volumeInfo.imageLinks.smallThumbnail,
          link: vol.infoLink
        };

        self.added('gbooks', volIsbn, doc);
      }
    });

    self.ready();
});

function findISBN(volumeInfo){
  if (volumeInfo.industryIdentifiers){
    var result = volumeInfo.industryIdentifiers.filter(function(id){
        return id.type == "ISBN_13";}
    );
    if (result && result[0])
      return result[0].identifier;

    result = volumeInfo.industryIdentifiers.filter(function(id){
        return id.type == "ISBN_10";}
    );
    if (result && result[0])
      return result[0].identifier;
  }
  return null;
}

function arrayToTitleCase(array){
  array.map(function(e) {
    e.toTitleCase();
  });
  return array;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
