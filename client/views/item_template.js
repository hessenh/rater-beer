Template.item.events({
    'click .claimItem': function(event) {
      event.preventDefault();
      Meteor.call('claimItem',this);
    },
    'click .item': function(event) {
      event.preventDefault();
      Router.go('/items/'+this._id);
    }
})

Template.item.helpers({
   claimed: function () {
      if (Collected.find({beer_id:this._id, user_id: Meteor.userId()}).count() > 0) {
        return false
    } 
    return true
   }
});

Template.registerHelper('allItems', function() {
  console.log(Items.find().count())
  return Items.find({});
})
