

Template.item_info.events({
	'click .btn-pref .btn': function(event) {
	    $('.btn-pref .btn').removeClass("btn-primary").addClass("btn-default");
	    $(".tab").addClass("active"); // instead of this do the below 
	    $(this).removeClass("btn-default").addClass("btn-primary");   
	},
	'click .claim': function(event) {
		Meteor.call('claimItem',this);
	},
	'keyup .comment-field': function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			var comment = $('.comment-field').val();
			var rating = $('#rating').data('userrating');

			Meteor.call('add_comment', this._id, Meteor.user(), comment, rating, function (error, result) {
			if (error) {
				console.log(error);
			}
			if (result) {
				$('.comment-field').val('');
			} else {
				$('.comment-field').val('');
				alert("You have already reviewd this beer.")
			}
			});
		}
	}
})

Template.registerHelper('claimed', function () {
    if (Collected.findOne({_id:this._id, userId: Meteor.userId()})) {
        return false
    } 
    return true
})


Template.item_info.helpers({
	comments_list: function () {
   		return Comments.find({beer_id: this._id}, {sort: {time_stamp: -1}})
   },
   rating_score: function () {
   		// Find average score
   		var total = 0;
   		var number = 0;

		Comments.find({beer_id: this._id}).map(function(doc) {
			total += doc.r;
			if (doc.r =! 0) {
				number += 1;
			}
		});
		return total * 1.0 / number;
   }
});