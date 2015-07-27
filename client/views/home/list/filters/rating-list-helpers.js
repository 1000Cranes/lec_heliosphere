Template.ratingList.helpers({
  checked: function () {
    var selectedRatings = Session.get('rating-filter');
    var name = Template.parentData(0).name;
    if($.inArray(name, selectedRatings ) < 0)
      return false;
    return "checked";
  }
});