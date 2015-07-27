// RadarChart = {
//   defaultConfig: {
//     containerClass: 'radar-chart',
//     w: 600,
//     h: 600,
//     factor: 0.95,
//     factorLegend: 1,
//     levels: 3,
//     levelTick: false,
//     TickLength: 10,
//     maxValue: 0,
//     radians: 2 * Math.PI,
//     color: d3.scale.category10(),
//     axisLine: true,
//     axisText: true,
//     circles: true,
//     radius: 5,
//     backgroundTooltipColor: "#555",
//     backgroundTooltipOpacity: "0.7",
//     tooltipColor: "white",
//     axisJoin: function(d, i) {
//       return d.className || i;
//     },
//     transitionDuration: 300
//   },
//   chart: function() {
//     // default config
//     var cfg = Object.create(RadarChart.defaultConfig);
//     var toolip;
//     function setTooltip(msg){
//       if(msg == false){
//         tooltip.classed("visible", 0);
//         tooltip.select("rect").classed("visible", 0);
//       }else{
//         tooltip.classed("visible", 1);
            
//             var x = d3.event.x;
//                 y = d3.event.y;

//         tooltip.select("text").classed('visible', 1).style("fill", cfg.tooltipColor);
//         var padding=5;
//         var bbox = tooltip.select("text").text(msg).node().getBBox();

//         tooltip.select("rect")
//         .classed('visible', 1).attr("x", 0)
//         .attr("x", bbox.x - padding)
//         .attr("y", bbox.y - padding)
//         .attr("width", bbox.width + (padding*2))
//         .attr("height", bbox.height + (padding*2))
//         .attr("rx","5").attr("ry","5")
//         .style("fill", cfg.backgroundTooltipColor).style("opacity", cfg.backgroundTooltipOpacity);
//         tooltip.attr("transform", "translate(" + x + "," + y + ")")
//       }
//     }
//     function radar(selection) {
//       selection.each(function(data) {
//         var container = d3.select(this);
//         tooltip = container.append("g");
//         tooltip.append('rect').classed("tooltip", true);
//         tooltip.append('text').classed("tooltip", true);

//         // allow simple notation
//         data = data.map(function(datum) {
//           if(datum instanceof Array) {
//             datum = {axes: datum};
//           }
//           return datum;
//         });

//         var maxValue = Math.max(cfg.maxValue, d3.max(data, function(d) {
//           return d3.max(d.axes, function(o){ return o.value; });
//         }));

//         var allAxis = data[0].axes.map(function(i, j){ return {name: i.axis, xOffset: (i.xOffset)?i.xOffset:0, yOffset: (i.yOffset)?i.yOffset:0}; });
//         var total = allAxis.length;
//         var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
//         var radius2 = Math.min(cfg.w / 2, cfg.h / 2);

//         container.classed(cfg.containerClass, 1);

//         function getPosition(i, range, factor, func){
//           factor = typeof factor !== 'undefined' ? factor : 1;
//           return range * (1 - factor * func(i * cfg.radians / total));
//         }
//         function getHorizontalPosition(i, range, factor){
//           return getPosition(i, range, factor, Math.sin);
//         }
//         function getVerticalPosition(i, range, factor){
//           return getPosition(i, range, factor, Math.cos);
//         }

//         // levels && axises
//         var levelFactors = d3.range(0, cfg.levels).map(function(level) {
//           return radius * ((level + 1) / cfg.levels);
//         });

//         var levelGroups = container.selectAll('g.level-group').data(levelFactors);

//         levelGroups.enter().append('g');
//         levelGroups.exit().remove();

//         levelGroups.attr('class', function(d, i) {
//           return 'level-group level-group-' + i;
//         });

//         var levelLine = levelGroups.selectAll('.level').data(function(levelFactor) {
//           return d3.range(0, total).map(function() { return levelFactor; });
//         });

//         levelLine.enter().append('line');
//         levelLine.exit().remove();

//         if (cfg.levelTick){
//           levelLine
//           .attr('class', 'level')
//           .attr('x1', function(levelFactor, i){
//             if (radius == levelFactor) {
//               return getHorizontalPosition(i, levelFactor);
//             } else {
//               return getHorizontalPosition(i, levelFactor) + (cfg.TickLength / 2) * Math.cos(i * cfg.radians / total);
//             }
//           })
//           .attr('y1', function(levelFactor, i){
//             if (radius == levelFactor) {
//               return getVerticalPosition(i, levelFactor);
//             } else {
//               return getVerticalPosition(i, levelFactor) - (cfg.TickLength / 2) * Math.sin(i * cfg.radians / total);
//             }
//           })
//           .attr('x2', function(levelFactor, i){
//             if (radius == levelFactor) {
//               return getHorizontalPosition(i+1, levelFactor);
//             } else {
//               return getHorizontalPosition(i, levelFactor) - (cfg.TickLength / 2) * Math.cos(i * cfg.radians / total);
//             }
//           })
//           .attr('y2', function(levelFactor, i){
//             if (radius == levelFactor) {
//               return getVerticalPosition(i+1, levelFactor);
//             } else {
//               return getVerticalPosition(i, levelFactor) + (cfg.TickLength / 2) * Math.sin(i * cfg.radians / total);
//             }
//           })
//           .attr('transform', function(levelFactor) {
//             return 'translate(' + (cfg.w/2-levelFactor) + ', ' + (cfg.h/2-levelFactor) + ')';
//           });
//         }
//         else{
//           levelLine
//           .attr('class', 'level')
//           .attr('x1', function(levelFactor, i){ return getHorizontalPosition(i, levelFactor); })
//           .attr('y1', function(levelFactor, i){ return getVerticalPosition(i, levelFactor); })
//           .attr('x2', function(levelFactor, i){ return getHorizontalPosition(i+1, levelFactor); })
//           .attr('y2', function(levelFactor, i){ return getVerticalPosition(i+1, levelFactor); })
//           .attr('transform', function(levelFactor) {
//             return 'translate(' + (cfg.w/2-levelFactor) + ', ' + (cfg.h/2-levelFactor) + ')';
//           });
//         }
//         if(cfg.axisLine || cfg.axisText) {
//           var axis = container.selectAll('.axis').data(allAxis);

//           var newAxis = axis.enter().append('g');
//           if(cfg.axisLine) {
//             newAxis.append('line');
//           }
//           if(cfg.axisText) {
//             newAxis.append('text');
//           }

//           axis.exit().remove();

//           axis.attr('class', 'axis');

//           if(cfg.axisLine) {
//             axis.select('line')
//               .attr('x1', cfg.w/2)
//               .attr('y1', cfg.h/2)
//               .attr('x2', function(d, i) { return (cfg.w/2-radius2)+getHorizontalPosition(i, radius2, cfg.factor); })
//               .attr('y2', function(d, i) { return (cfg.h/2-radius2)+getVerticalPosition(i, radius2, cfg.factor); });
//           }

//           if(cfg.axisText) {
//             axis.select('text')
//               .attr('class', function(d, i){
//                 var p = getHorizontalPosition(i, 0.5);

//                 return 'legend ' +
//                   ((p < 0.4) ? 'left' : ((p > 0.6) ? 'right' : 'middle'));
//               })
//               .attr('dy', function(d, i) {
//                 var p = getVerticalPosition(i, 0.5);
//                 return ((p < 0.1) ? '1em' : ((p > 0.9) ? '0' : '0.5em'));
//               })
//               .text(function(d) { return d.name; })
//               .attr('x', function(d, i){ return d.xOffset+ (cfg.w/2-radius2)+getHorizontalPosition(i, radius2, cfg.factorLegend); })
//               .attr('y', function(d, i){ return d.yOffset+ (cfg.h/2-radius2)+getVerticalPosition(i, radius2, cfg.factorLegend); });
//           }
//         }

//         // content
//         data.forEach(function(d){
//           d.axes.forEach(function(axis, i) {
//             axis.x = (cfg.w/2-radius2)+getHorizontalPosition(i, radius2, (parseFloat(Math.max(axis.value, 0))/maxValue)*cfg.factor);
//             axis.y = (cfg.h/2-radius2)+getVerticalPosition(i, radius2, (parseFloat(Math.max(axis.value, 0))/maxValue)*cfg.factor);
//           });
//         });
//         var polygon = container.selectAll(".area").data(data, cfg.axisJoin);

//         polygon.enter().append('polygon')
//           .classed({area: 1, 'd3-enter': 1})
//           .on('mouseover', function (dd){
//             d3.event.stopPropagation();
//             container.classed('focus', 1);
//             d3.select(this).classed('focused', 1);
//             setTooltip(dd.className);
//           })
//           .on('mouseout', function(){
//             d3.event.stopPropagation();
//             container.classed('focus', 0);
//             d3.select(this).classed('focused', 0);
//             setTooltip(false);
//           });

//         polygon.exit()
//           .classed('d3-exit', 1) // trigger css transition
//           .transition().duration(cfg.transitionDuration)
//             .remove();

//         polygon
//           .each(function(d, i) {
//             var classed = {'d3-exit': 0}; // if exiting element is being reused
//             classed['radar-chart-serie' + i] = 1;
//             if(d.className) {
//               classed[d.className] = 1;
//             }
//             d3.select(this).classed(classed);
//           })
//           // styles should only be transitioned with css
//           .style('stroke', function(d, i) { return cfg.color(i); })
//           .style('fill', function(d, i) { return cfg.color(i); })
//           .transition().duration(cfg.transitionDuration)
//             // svg attrs with js
//             .attr('points',function(d) {
//               return d.axes.map(function(p) {
//                 return [p.x, p.y].join(',');
//               }).join(' ');
//             })
//             .each('start', function() {
//               d3.select(this).classed('d3-enter', 0); // trigger css transition
//             });

//         if(cfg.circles && cfg.radius) {

//           var circleGroups = container.selectAll('g.circle-group').data(data, cfg.axisJoin);

//           circleGroups.enter().append('g').classed({'circle-group': 1, 'd3-enter': 1});
//           circleGroups.exit()
//             .classed('d3-exit', 1) // trigger css transition
//             .transition().duration(cfg.transitionDuration).remove();

//           circleGroups
//             .each(function(d) {
//               var classed = {'d3-exit': 0}; // if exiting element is being reused
//               if(d.className) {
//                 classed[d.className] = 1;
//               }
//               d3.select(this).classed(classed);
//             })
//             .transition().duration(cfg.transitionDuration)
//               .each('start', function() {
//                 d3.select(this).classed('d3-enter', 0); // trigger css transition
//               });

//           var circle = circleGroups.selectAll('.circle').data(function(datum, i) {
//             return datum.axes.map(function(d) { return [d, i]; });
//           });

//           circle.enter().append('circle')
//             .classed({circle: 1, 'd3-enter': 1})
//             .on('mouseover', function(dd){
//               d3.event.stopPropagation();
//               setTooltip(dd[0].value);
//               //container.classed('focus', 1);
//               //container.select('.area.radar-chart-serie'+dd[1]).classed('focused', 1);
//             })
//             .on('mouseout', function(dd){
//               d3.event.stopPropagation();
//               setTooltip(false);
//               container.classed('focus', 0);
//               //container.select('.area.radar-chart-serie'+dd[1]).classed('focused', 0);
//               //No idea why previous line breaks tooltip hovering area after hoverin point.
//             });

//           circle.exit()
//             .classed('d3-exit', 1) // trigger css transition
//             .transition().duration(cfg.transitionDuration).remove();

//           circle
//             .each(function(d) {
//               var classed = {'d3-exit': 0}; // if exit element reused
//               classed['radar-chart-serie'+d[1]] = 1;
//               d3.select(this).classed(classed);
//             })
//             // styles should only be transitioned with css
//             .style('fill', function(d) { return cfg.color(d[1]); })
//             .transition().duration(cfg.transitionDuration)
//               // svg attrs with js
//               .attr('r', cfg.radius)
//               .attr('cx', function(d) {
//                 return d[0].x;
//               })
//               .attr('cy', function(d) {
//                 return d[0].y;
//               })
//               .each('start', function() {
//                 d3.select(this).classed('d3-enter', 0); // trigger css transition
//               });

//           // ensure tooltip is upmost layer
//           var tooltipEl = tooltip.node();
//           tooltipEl.parentNode.appendChild(tooltipEl);
//         }
//       });
//     }

//     radar.config = function(value) {
//       if(!arguments.length) {
//         return cfg;
//       }
//       if(arguments.length > 1) {
//         cfg[arguments[0]] = arguments[1];
//       }
//       else {
//         d3.entries(value || {}).forEach(function(option) {
//           cfg[option.key] = option.value;
//         });
//       }
//       return radar;
//     };

//     return radar;
//   },
//   draw: function(id, d, options) {
//     var chart = RadarChart.chart().config(options);
//     var cfg = chart.config();

//     d3.select(id).select('svg').remove();
//     d3.select(id)
//       .append("svg")
//       .attr("width", cfg.w)
//       .attr("height", cfg.h)
//       .datum(d)
//       .call(chart);
//   }
// };
RadarChart = {
  draw: function(id, d, options){
  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 0.95,
    factorLegend:1,
	 levels: 3,
	 maxValue: .99,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 0,
	 TranslateX: 80,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scale.category10(),
   showlabels: true
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	var allAxis = (d[0].map(function(i, j){return i.axis}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('%');
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

    
	//Text indicating at what % each level is
    if(cfg.showLevelPercents){
      	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
    }

	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1px");

     if(cfg.showlabels){
	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
     }

 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", cfg.color(series))
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 .style("fill", function(j, i){return cfg.color(series)})
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;


	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
		.attr('r', cfg.radius)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		.style("fill", cfg.color(series)).style("fill-opacity", .9)
		.on('mouseover', function (d){
					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);
						
					z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1); 
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				  })
		.on('mouseout', function(){
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				  })
		.append("svg:title")
		.text(function(j){return Math.max(j.value, 0)});

	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
  }
};