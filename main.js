const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left:50, right:50, top:50, bottom:50}

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME1 = d3.select('#vis1')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_WIDTH)
					.attr('class', 'frame')


d3.csv('data/city-hall.csv').then((data) => {

	function(d){
    return { date : d3.timeParse('%c')(d.DateTime_Measured), value : d.Total_Demand_KW }
  },


	function(data) {
    // Add X axis --> it is a date format
    let x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, VIS_WIDTH ]);
    FRAME1.append("g")
      .attr("transform", "translate(0," + VIS_HEIGHT + ")")
      .call(d3.axisBottom(x));
    // Add Y axis
    let y = d3.scaleLinear()
      .domain( [0, 3000])
      .range([ VIS_HEIGHT, 0 ]);
    FRAME1.append("g")
      .call(d3.axisLeft(y));
    // Add the line
    FRAME1.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    // Add the points
    FRAME1.append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("fill", "#69b3a2")
}

	FRAME1.append('g')
		.attr('transform', 'translate('+MARGINS.left+','+ (VIS_HEIGHT + MARGINS.top)+')')
		.call(d3.axisBottom(X_SCALE))
			.attr('font-size', '20px');

	FRAME1.append("g") 
      .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")") 
      	.call(d3.axisLeft(Y_SCALE).ticks(10)) 
        .attr("font-size", '20px'); 


});

d3.csv("data/data.csv").then( (data) => {
     
     console.log(data); 

}); 

console.log(data); 
