Template.books.onCreated(function () {
  var instance = this;
  instance.autorun(function () {
      instance.subscribe('books');
  });

  instance.books = function() {
    return Books.find();
  }
});

Template.books.helpers({
  books: function() {
    return Template.instance().books();
  }
});
