Template.search.onCreated(function () {
  var instance = this;
  instance.query = new ReactiveVar("");

  instance.autorun(function () {

      var query = instance.query.get();
      if (!!query){
        instance.subscribe('booksSearch', query);
      }
    });

    instance.gbooks = function() {
      return GBooks.find();
    }
});

Template.search.events({
    "submit .search": function (event, instance) {
      event.preventDefault();

      var text = event.target.text.value;
      if (!!text){
        instance.query.set(text);
      }
    }
});

Template.search.helpers({
  gbooks: function() {
    return Template.instance().gbooks();
  }
});
