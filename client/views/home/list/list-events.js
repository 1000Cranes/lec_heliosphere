Template.packagesList.events({
  'click #load-more': function(event){
    if(Session.get('limit-filter') === undefined)
      return Session.set('limit-filter', parseInt($('#itemsPerPage').val()) * 2 );
    return Session.set('limit-filter', parseInt(Session.get('limit-filter')) + parseInt($('#itemsPerPage').val()) );
  }
});