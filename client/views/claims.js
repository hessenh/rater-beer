Template.claims.helpers({
	claimedList: function () {
   		return Collected.find({userId: Meteor.userId()}, {sort: {time_stamp: 1}})
   }
});



Template.claim_item.events({
    'click .claim-item': function(event) {
      event.preventDefault();
      Router.go('/items/'+this._id);
    }
})
