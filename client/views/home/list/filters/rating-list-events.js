Template.ratingList.events({
  'click .filter-rating': function () {
    var ratings = Session.get("rating-filter");
    if(ratings === undefined || ratings === null) {
      ratings = [this.name];
    } 
    else {
      if(ratings.indexOf(this.name) > -1) {
        //array already has this tag, so remove it
        ratings.pop(this.name);
      } 
      else {
        ratings.push(this.name);
      }
    }   
    Session.set('rating-filter',ratings);
  }
});