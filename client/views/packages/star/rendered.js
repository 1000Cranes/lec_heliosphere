Template.starChart.rendered = function () { 
var w = 85, h = 85;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];
var installs = 0;
var stars = 0;
var score = 0;
var comments = 0;
var tutorials = 0;
  
if(Template.parentData(0).installs !== undefined){
  installs = (Template.parentData(0).installs / Template.parentData(0).maxInstalls).toFixed(2);
}
if(Template.parentData(0).stars !== undefined){
  installs = (Template.parentData(0).stars / Template.parentData(0).maxStars).toFixed(2);
}
if(Template.parentData(0).score !== undefined){
  installs = (Template.parentData(0).score / Template.parentData(0).maxScore).toFixed(2);
}  
//Data
var d = [
		  [
			{axis:"Installs",value:installs},
			{axis:"Stars",value:stars},
			{axis:"Score",value:score},
			{axis:"Comments",value:0.34},
			{axis:"Tutorials",value:0.48}
		  ]
		];
// var d = [
// 		  [
// 			{axis:"Email",value:0.59},
// 			{axis:"Social Networks",value:0.56},
// 			{axis:"Internet Banking",value:0.42},
// 			{axis:"News Sportsites",value:0.34},
// 			{axis:"Search Engine",value:0.48}
// 		  ],[
// 			{axis:"Email",value:0.48},
// 			{axis:"Social Networks",value:0.41},
// 			{axis:"Internet Banking",value:0.27},
// 			{axis:"News Sportsites",value:0.28},
// 			{axis:"Search Engine",value:0.46}
// 		  ]
// 		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
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

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

// var svg = d3.select('#body')
// 	.selectAll('svg')
// 	.append('svg')
// 	.attr("width", w+300)
// 	.attr("height", h)

// //Create the title for the legend
// var text = svg.append("text")
// 	.attr("class", "title")
// 	.attr('transform', 'translate(90,0)') 
// 	.attr("x", w - 70)
// 	.attr("y", 10)
// 	.attr("font-size", "12px")
// 	.attr("fill", "#404040")
// 	.text("What % of owners use a specific service in a week");
		
// //Initiate Legend	
// var legend = svg.append("g")
// 	.attr("class", "legend")
// 	.attr("height", 100)
// 	.attr("width", 200)
// 	.attr('transform', 'translate(90,20)') 
// 	;
// 	//Create colour squares
// 	legend.selectAll('rect')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("rect")
// 	  .attr("x", w - 65)
// 	  .attr("y", function(d, i){ return i * 20;})
// 	  .attr("width", 10)
// 	  .attr("height", 10)
// 	  .style("fill", function(d, i){ return colorscale(i);})
// 	  ;
// 	//Create text next to squares
// 	legend.selectAll('text')
// 	  .data(LegendOptions)
// 	  .enter()
// 	  .append("text")
// 	  .attr("x", w - 52)
// 	  .attr("y", function(d, i){ return i * 20 + 9;})
// 	  .attr("font-size", "11px")
// 	  .attr("fill", "#737373")
// 	  .text(function(d) { return d; })
// 	  ;	
 };