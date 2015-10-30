Template.logout.events({
   'click .logoutBtn': function(event) {
    
		event.preventDefault();

		Meteor.logout();

    }
});