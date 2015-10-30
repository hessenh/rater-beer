Items = new Mongo.Collection("items");
Collected = new Mongo.Collection("collected");
Comments = new Mongo.Collection("comments");

Meteor.publish("items", function () {
    return Items.find();
});
Meteor.publish("collected", function () {
	return Collected.find({});
});
Meteor.publish("comments", function () {
  return Comments.find({});
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
        var userItem = {
            _id: item._id,
            c: item.c,
            brand: item.brand,
            name: item.name,
            userId: Meteor.userId(),
            time_stamp: new Date()
        }
        if(!Collected.findOne(userItem)) {
            Collected.insert(userItem);
        } else {
            Collected.remove(userItem);
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
});
