Template.header.events({
  'keyup #search': function(event){
    return Session.set('search-filter', event.currentTarget.value);
  },
  'change #itemsPerPage': function(event){
    return Session.set('limit-filter', event.currentTarget.value);
  }
});