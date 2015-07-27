Template.header.helpers({
  tags: function () {
    return Tags.fetchUniqueTagsLabelValuePair();
  },
  ratings: function() {
    var ratings = [];
    ratings.push({name: RatingTypes[0], color: "green darken-1"});
    ratings.push({name: RatingTypes[1], color: "yellow darken-3"});
    ratings.push({name: RatingTypes[2], color: "red darken-1"});
    return ratings;
  },
  searchText: function() {
    return Session.get('search-filter');
  },
  selectedData: function(data) {
    if(data === Session.get('limit-filter')){
       return 'selected'
     }
  }
});