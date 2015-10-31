Router.route('/', function () {
  this.render('home');
});
Router.route('/items/:_id', {
    template: 'item_info',
    	data: function(){
    		var currentItem = this.params._id;
        	return Items.findOne({_id:currentItem})
    }
});

Router.route('claims');
Router.route('register');
Router.route('bars');
