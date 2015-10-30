Template.register.events({
    'keyup .registerPassword': function(event) {
    	if(event.keyCode == 13) {
	        event.preventDefault();

	        var username = $('.registerUsername').val();
	        var password = $('.registerPassword').val();
	        Accounts.createUser({
            	username: username,
            	password: password
      	    });
    	}
    }
});