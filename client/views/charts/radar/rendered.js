Template.starChart.rendered = function () { 
var w = 85, h = 85;

var colorscale = d3.scale.category10();

var installs = 0;
var stars = 0;
var score = 0;
var comments = 0;
var tutorials = 0;

var maxValue = Meteor.call('getMaxValue', function(err,response) {
			if(err) {
				console.log("Error:" + err.reason);
				return null;
			}
			return response;
}); 

  console.log("maxValue:" + maxValue);
  if(maxValue !== null) {
    if(Template.parentData(0).stars !== undefined){
      stars = (Template.parentData(0).stars / maxValue).toFixed(2);
    }
    if(Template.parentData(0).score !== undefined){
      score = (Template.parentData(0).score / maxValue).toFixed(2);
    }  
    //Data
    var d = [
          [
          {axis:"Installs",value:.5},
          {axis:"Stars",value:stars},
          {axis:"Score",value:score},
          {axis:"Comments",value:0.34},
          {axis:"Tutorials",value:0.48}
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
      showlabels: false
    }

    //Call function to draw the Radar chart
    //Will expect that data is in %'s
    RadarChart.draw("#chart" + Template.parentData(0)._id, d, mycfg);
  }


 };