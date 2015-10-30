

Template.add_item.events({
	'click .add-item-btn': function (event) {
		event.preventDefault();

		var brand = $('.brand').val();
		var name = $('.name').val();
		var message = $('.message').val();
		
		Meteor.call('add-item',brand, name, message, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
		$('.searchItem').val(name);
		Session.set("searchfield", true);
	}
})