Template.registerHelper('claimed', function () {
    if (Collected.findOne({_id:this._id, userId: Meteor.userId()})) {
        return false
    } 
    return true
})

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

Template.registerHelper('allItems', function() {
  console.log(Items.find().count())
  return Items.find({});
})
