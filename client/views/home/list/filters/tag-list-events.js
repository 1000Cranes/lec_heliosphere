Template.tagList.events({
  'click .filter-tag': function () {
    var tags = Session.get("tag-filters");
    if(tags === undefined || tags === null) {
      tags = [this.label];
    } 
    else {
      if(tags.indexOf(this.label) > -1) {
        //array already has this tag, so remove it
        tags.pop(this.label);
      } 
      else {
        tags.push(this.label);
      }
    }   
    Session.set('tag-filters',tags);
  }
});