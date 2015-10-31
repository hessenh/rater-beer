Items = new Mongo.Collection("items");
Collected = new Mongo.Collection("collected");
Comments = new Mongo.Collection("comments");
Facts = new Mongo.Collection("facts");
Bars = new Mongo.Collection("nearbybars");

Meteor.publish("items", function () {
    return Items.find();
});
Meteor.publish("collected", function () {
	return Collected.find({});
});
Meteor.publish("comments", function () {
  return Comments.find({});
});
Meteor.publish("facts", function () {
  return Facts.find({});
});

Meteor.publish("nearbybars", function (latlng) {
   return Bars.find({
      location: {
        $near: {
          $geometry: {
            "type": "Point",
            "coordinates": [63.43020, 10.39269]
          },
          $maxDistance: 20000   //meters
        }
      }
    });
});

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

Meteor.methods({
    'claimItem': function(item) {
      if(Collected.find({beer_id: item._id, user_id: Meteor.userId(), name: item.name}).count()< 1) {
          return Collected.insert({beer_id: item._id, user_id: Meteor.userId(), name: item.name});
      } else {
          var id = Collected.findOne({beer_id: item._id, user_id: Meteor.userId(), name: item.name})._id;
          return Collected.remove({_id:id});
      }
    },
    'add-item': function(brand, name, message) {
      return Items.insert({
        brand: brand,
        name: name
      });
    },
    'add_comment': function(beer_id, user, comment, rating) {
      if (Comments.find({beer_id:beer_id, user_id:user._id}).count() > 0) {
        return false;
      } else {
        return Comments.insert({
          beer_id: beer_id,
          user_id: user._id,
          user_name: user.username,
          comment: comment,
          r: rating,
          time_stamp: new Date()
        })
      }
    }
});


 Meteor.startup(function () {
    var items = [
    {
      "category": "Beer",
      "brew": "'T GAVERHOPKE",
      "name": "BRUINTJE",
      "style":"AMBER",
      "type": ["Pale Ale","IPA"],
      "logo": "bruints.png",
      'ABV': 6.8,
      "description": "'t Gaverhopke Bruintje is a double brown ale, with a nicely balanced malt, fruits and hops. A light and very easy drinkable version of their famous Twaalf"
    },
    {
      "category": "Beer",
      "brew": "'Bosteels",
      "name": "KWAK",
      "style":"AMBER",
      "type": ["Pale Ale","IPA"],
      "logo": "kwak.png",
      'ABV': 8.0,
      "description": "Brewed at the Bosteels brewery in Buggenhout, this iconic beer is best known for its unique glass, designed to sit in torch holders on coach and horses. But this beer is much more than a novelty glass – it’s deep amber colour and creamy, dense head yield a majestic Belgian beer. It has a caramel-like aroma with a spicy hop edge and hints of banana from the yeast. The sweet body gives way to a spicy and savoury finish that is pleasantly warming. A world-class beer."
    },{
      "category": "Beer",
      "brew": "Westerham",
      "name": "WESTERHAM WILLIAM WILBERFORCE FREEDOM ALE",
      "style":"BITTER",
      "type": ["Pale Ale","IPA"],
      "logo": "westerham_freedom_ale.png",
      'ABV': 4.8,
      "description": "Produced to commemorate the 200th anniversary of the Abolition of the Slave Trade Act on 25th March, 1807. Traditionally floor-malted Maris Otter pale ale malt, crystal malt and Kentish hops combine with Fairtrade Demerara sugar to produce a deep golden ale. It is characterised by its mellow bitterness and long hoppy finish. Suitable for vegans"
    }
    ]


    for (var i = 0; i < items.length; i++) {
        if (Items.find(items[i]).count() < 1) {
            Items.insert(items[i])
        }
    }

    // Facts borrowed from http://www.factslides.com/s-Beer
    var facts = [
    {
      "fact": "A Beer Wave of 388,000 Gallons (or 1.4m L) flooded London in 1814 after a huge vat ruptured.",
      "n": 1},{ 
      "fact": "Light is what makes Beer go bad.",
      "n": 2},{
      "fact": "George Washington had his own brewhouse on the grounds of Mount Vernon.",
      "n": 3},{
      "fact": "Egyptian Pyramid workers were paid with beer: 1 gallon (4L) per day.",
      "n": 4},{
      "fact": "The oldest known recipe for BEER is over 4,000 years old, made by Sumerians.",
      "n": 5},{
      "fact": "BEER and MARIJUANA are cousins: beer's hops are in the same family of flowering plants as marijuana.",
      "n": 6},{
      "fact": "In the Middle Ages BEER was consumed more than water as the alcohol made it safer.",
      "n": 7},{
      "fact": "Beer is claimed to help prevent cardiac disease and cognitive decline.",
      "n": 8},{
      "fact": "At any given time, 0.7% of the world is drunk. So 50 million people are drunk right now.",
      "n": 9},{ 
      "fact": "Cenosillicaphobia is the fear of an empty beer glass.",
      "n": 10},{
      "fact": "The world's longest hangover lasted 4 weeks after a Scotsman consumed 60 pints of beer.",
      "n": 11},{
      "fact": "The strongest beer in the world has a 67.5% alcohol content.",
      "n": 12},{
      "fact": "Slugs like beer.",
      "n": 13},{
      "fact": "Beer was not considered an alcoholic beverage in Russia until 2013.",
      "n": 14},{
      "fact": "Until the 1970s in Belgium, table beer was served in schools refectories.",
      "n": 15},{
      "fact": "At the Wife Carrying World Championships in Finland, first prize is the wife's weight in beer.",
      "n": 16},{ 
      "fact": "There's a beer brewed from bananas in Africa.",
      "n": 17},{
      "fact": "The Wat Pa Maha Chedi Kaew temple in Thailand was constructed with 1 million bottles of Heineken and a local beer.",
      "n": 18},{ 
      "fact": "More Guinness beer is drunk in Nigeria than Ireland.",
      "n": 19},{ 
      "fact": "In the Land of the Pharaohs of Egypt, beer was the national currency.",
      "n": 20},{
      "fact": "In Argentina, political parties have their own brands of beer.",
      "n": 21},{
      "fact": "Norway's first aircraft hijacking was resolved after the hijacker surrendered his weapon in exchange for more beer.",
      "n": 22},{ 
      "fact": "When scientist Niels Bohr won the Nobel Prize in 1922, the Carlsberg brewery gave him a perpetual supply of beer piped into his house.",
      "n": 23}]

    for (var i = 0; i < facts.length; i++) {
        if (Facts.find(facts[i]).count() < 1) {
            Facts.insert(facts[i])
        }
    }
    var bars = [
    {
      "bar_name": "Dublin",
      "location": {
        "type": "Point",
        "coordinates": [63.43020, 10.39269]
      }
    },
    {
      "bar_name": "Lille London",
      "location": {
        "type": "Point",
        "coordinates": [63.43399, 10.39819]
      }
    },
    {
      "bar_name": "Keisern",
      "location": {
        "type": "Point",
        "coordinates": [62.47129, 6.15974]
      }
    }

    ]
    for (var i = 0; i < bars.length; i++) {
        if (Bars.find(bars[i]).count() < 1) {
            Bars.insert(bars[i])
        }
    }
    Bars._ensureIndex({location: "2dsphere"});
});
