Template.claims.helpers({
	claimedList: function () {
   		return Collected.find({user_id: Meteor.userId()})
   },
   random_beer_fact: function () {
   		var random = Math.floor(Math.random() * Facts.find({}).count()) + 1
    	return Facts.findOne({n: random}).fact;
   },
   number_of_beers : function () {
   		return Collected.find({user_id: Meteor.userId()}).count();
   }
});



Template.claim_item.events({
    'click .claim-item': function(event) {
      event.preventDefault();
      Router.go('/items/'+this._id);
    }
})
