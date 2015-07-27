Template.starChart.rendered = function () { 
var w = 120, h = 120;

var colorscale = d3.scale.category10();
var packageIDs = _.pluck(Packages.find({}).fetch(), '_id') // array of displayed package IDs
var maxInstalls = Packages.findOne({},{sort: {installs_per_year: -1}}).installs_per_year;
var maxStars = Packages.findOne({},{sort: {stars: -1}}).stars;
var maxScore = Packages.findOne({},{sort: {score: -1}}).score;
var maxComments = _.max(_.values(_.groupBy(_.pluck(Comments.find({ packageID: {$in: packageIDs }}).fetch(), 'packageID'))), function(c){ return c.length; }).length;
var maxTutorials = _.max(_.values(_.groupBy(_.pluck(Tutorials.find({ packageID: {$in: packageIDs }}).fetch(), 'packageID'))), function(c){ return c.length; }).length;;
  
//   console.log("Template.parentData(0).stars:" + Template.parentData(0).stars);
//   console.log("Template.parentData(0).score:" + Template.parentData(0).score);
//   console.log("Template.parentData(0).installs_per_year:" + Template.parentData(0).installs_per_year);
//   console.log("Comments:" + Comments.findNumberOfComments(Template.parentData(0)._id));
//   console.log("Tutorials:" + Tutorials.findTutorials(Template.parentData(0)._id).count());
  
//   console.log("maxInstalls:" + maxInstalls);
//   console.log("maxStars:" + maxStars);
//   console.log("maxScore:" + maxScore);
//   console.log("maxComments:" + maxComments);
//   console.log("maxTutorials:" + maxTutorials);
  
  var installs = 0;
  if(Template.parentData(0).installs_per_year !== undefined && maxInstalls != undefined)
  {
    installs = (Template.parentData(0).installs_per_year/maxInstalls).toFixed(2);
  }
  var stars = 0;
  if(Template.parentData(0).stars !== undefined && maxStars != undefined)
  {
    stars = (Template.parentData(0).stars/maxStars).toFixed(2);
  }
  var score = 0;
  if(Template.parentData(0).score !== undefined && maxScore != undefined)
  {
    score = (Template.parentData(0).score/maxScore).toFixed(2);
  }
  var comments = 0;
  if(Comments.findNumberOfComments(Template.parentData(0)._id) !== 0 && maxComments != undefined )
  {
    comments = (Comments.findNumberOfComments(Template.parentData(0)._id)/maxComments).toFixed(2);
  }
  var tutorials = 0;
  if(Tutorials.findTutorials(Template.parentData(0)._id).count() !== 0 && maxTutorials != undefined )
  {
    tutorials = (Tutorials.findTutorials(Template.parentData(0)._id).count()/maxTutorials).toFixed(2);
  }
    //Data
    var d = [
          [
          {axis:"Installs",value:installs},
          {axis:"Stars",value:stars},
          {axis:"Score",value:score},
          {axis:"Comments",value:comments},
          {axis:"Tutorials",value:tutorials}
          ]
        ];

    //Options for the Radar chart, other than default
    var mycfg = {
      w: w,
      h: h,
      maxValue: 1,
      levels: 6,
      ExtraWidthX: 0,
      ExtraWidthY: 0,
      radius: 3,
      TranslateX: 5,
      TranslateY: 5,
      showlabels: true
    }

    //Call function to draw the Radar chart
    //Will expect that data is in %'s
    RadarChart.draw("#chart" + Template.parentData(0)._id, d, mycfg);
 };