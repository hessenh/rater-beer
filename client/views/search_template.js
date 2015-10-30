Session.set('searchfield', false);
Template.search.events({
  'keyup .searchItem': function(event) {
    if($('.searchItem').val()===""){
      Session.set('searchfield', false);
    } else {
      Session.set('searchfield', true);
    }
  }
})

Template.registerHelper('searchfield', function() {
  return Session.get('searchfield');
})