Meteor.methods({
  getCurrentTime: function () {
    console.log('on server, getCurrentTime called');
    return new Date();
  },

  getMaxValue: function () {   
    var maxValue = 0;
    var stars = Packages.findOne({}, {sort: {"atmos.0.starCount": -1}}).atmos[0].starCount;
    console.log('starCount ' + starCount);
    if(maxValue < stars) maxValue = stars;
    var score = Packages.findOne({}, {sort: {"atmos.0.score": -1}}).atmos[0].score;
    console.log('score ' + score);
    if(maxValue < score) maxValue = score;
    
    return maxValue;
  }
});