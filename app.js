// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 60, left: 60},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#gini_and_homicide")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/newton-c/inequality_and_homicide/main/data/hom_and_gini.csv").then( function(data) {

    // Add X axis
    const x = d3.scaleLinear()
    .domain([20, 56])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 65])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    r = d3.scaleLinear()
    .domain([0, 52.11])
    .range([0, 60])

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("cx", function (d) { return x(d.gini); } )
        .attr("cy", function (d) { return y(d.homicides); } )
        .attr("r", function(d) { return r(d.homicides); } )
        .style("fill", "red")
        .style("opacity", 0.2)
        .style("stroke", "red")

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .text("Gini Coeffecient (0 means perfect income equality)");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Homicides per 100,000 People");
//     svg.append("path")
//      .datum(data)
//      .attr("fill", "none")
//      .attr("stroke", "red")
//      .attr("stroke-width", 1.5)
//      .attr("d", d3.line()
//        .x(function(d) { return x(d.index) })
//        //.y(function(d) { return y(d.gini) })
//        .y(155)
//        )
})

