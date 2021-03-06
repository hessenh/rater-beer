Items = new Mongo.Collection("items");
Collected = new Mongo.Collection("collected");
Comments = new Mongo.Collection('comments');
Facts = new Mongo.Collection("facts");
Bars = new Mongo.Collection("nearbybars");

Meteor.subscribe("items");
Meteor.subscribe("collected");
Meteor.subscribe("comments");
Meteor.subscribe("facts");
Meteor.subscribe("nearbybars"); //, {latlng: Session.get("latlng")}


EasySearch.createSearchIndex('people', {
  'field' : ['brand','name'],
  'collection' : Items,
  'limit' : 20,
  'use' : 'mongo-db',
  'props' : {
    'anyField' : true
  },
  'query' : function (searchString, opts) {
    // Default query that is used for searching
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    return query;
  }
});

Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
};