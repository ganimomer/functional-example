function toBarChart(options) {
  var categories = options.types, values = options.values;
  var colors = ['#0000b4', '#0082ca', '#0094ff', '#0d4bcf', '#0066AE', '#074285', '#00187B', '#285964', '#405F83', '#416545', '#4D7069', '#6E9985', '#7EBC89', '#0283AF', '#79BCBF', '#99C19E'];
  var tick = 10;
  var supremum = Math.floor((Math.max.apply(Math, values) + tick * 3)/tick) * tick;
  console.log('Max value is ' + Math.max.apply(Math, values) + ' and supremum is ' + supremum)
  var grid = d3.range(supremum/tick).map(function () {
    return {'y2': 480};
  });
  categories = [''].concat(categories);
  var tickVals = d3.range(supremum/tick).map(function (d, i) {
    return (i * tick) || 100;
  });

  var xscale = d3.scale.linear()
    .domain([0, supremum])
    .range([0, 720]);

  var yscale = d3.scale.linear()
    .domain([0, categories.length])
    .range([0, 480]);

  var colorScale = d3.scale.quantize()
    .domain([0, categories.length])
    .range(colors);

  var canvas = d3.select('#wrapper')
    .append('svg')
    .attr({'width': 900, 'height': 550});

  var grids = canvas.append('g')
    .attr('id', 'grid')
    .attr('transform', 'translate(250,10)')
    .selectAll('line')
    .data(grid)
    .enter()
    .append('line')
    .attr({
      'x1': function (d, i) { return i * 720 * tick/supremum; },
      'y1': function (d) { return 0; },
      'x2': function (d, i) { return i * 720 * tick/supremum; },
      'y2': function (d) { return d.y2; }
    })
    .style({'stroke': '#adadad', 'stroke-width': '1px'});

  var xAxis = d3.svg.axis();
  xAxis
    .orient('bottom')
    .scale(xscale)
    .tickValues(tickVals);

  var yAxis = d3.svg.axis();
  yAxis
    .orient('left')
    .scale(yscale)
    .tickSize(2)
    .tickFormat(function (d, i) { return categories[i]; })
    .tickValues(d3.range(categories.length));

  var y_xis = canvas.append('g')
    .attr("transform", "translate(250,0)")
    .attr('id', 'yaxis')
    .call(yAxis);

  var x_xis = canvas.append('g')
    .attr("transform", "translate(250,480)")
    .attr('id', 'xaxis')
    .call(xAxis);

  var chart = canvas.append('g')
    .attr("transform", "translate(250,0)")
    .attr('id', 'bars')
    .selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .attr('height', 19)
    .attr({'x': 0, 'y': function (d, i) { return yscale(i+1) - 10}})
    .style('fill', function (d, i) { return colorScale(i); })
    .attr('width', function (d) { return 0; });


  var transit = d3.select("svg").selectAll("rect")
    .data(values)
    .transition()
    .duration(1000)
    .attr("width", function (d) {return xscale(d); });

  var transitext = d3.select('#bars')
    .selectAll('text')
    .data(values)
    .enter()
    .append('text')
    .attr({'x': function (d) {return Math.max(xscale(d) - 20, 0)}, 'y': function (d, i) { return yscale(i+1) + 5; }})
    .text(function (d) { return d; }).style({'fill': '#eee', 'font-size': '14px'});
}
