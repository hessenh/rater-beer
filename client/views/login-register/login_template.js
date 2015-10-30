Template.login.events({
   'keyup .loginPassword': function(event) {
    	if(event.keyCode == 13) {
	        event.preventDefault();
	        var username = $('.loginUsername').val();
	        var password = $('.loginPassword').val();
	        console.log(username,password)
	        Meteor.loginWithPassword(username, password);
    	}
    },
    'click .register-collapse': function(event) {
    	event.preventDefault();
    	Session.set("/");
    	Router.go('register');
    },
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    }
});