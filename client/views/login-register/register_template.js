Template.register.events({
    'click .register-btn': function(event) {	
        event.preventDefault();

        var username = $('.registerUsername').val();
        var password = $('.registerPassword').val();
        Accounts.createUser({
        	username: username,
        	password: password
  	    }, function(error) {
            if (error) {
                alert("Could not create user.. Please try again");
            } else {
                Router.go("/");
            }
        });
	
    }
});