Template.login.events({
   'keyup .loginPassword': function(event) {
    	if(event.keyCode == 13) {
	        event.preventDefault();
	        var username = $('.loginUsername').val();
	        var password = $('.loginPassword').val();
	        console.log(username,password)
	        Meteor.loginWithPassword(username, password);
    	}
    }
});