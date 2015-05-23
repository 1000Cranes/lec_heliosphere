Template.packageItem.helpers({
  data: function() {
    return { 
      _id:this._id,
      stars: this.atmos[0].starCount,
      installs: this.atmos[0].installs_per_year,
      score: this.atmos[0].score,
      comments: 0, //Placeholder
      tutorials: 0, //Placeholder
      maxScore: 100, //Placeholder
      maxStars: 200, //Placeholder
      maxInstalls: 30000, //Placeholder
      maxComments: 10, //Placeholder
      maxTutorials: 10 //Placeholder
    };
  },
  id: function() { return this._id;}
});