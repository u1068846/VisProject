

var count=1;
function parallel(listData) {
    //Parallel.prototype.call(listData);
    var self = this;
    self.listData = listData;
    listInfo = self.listData;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
parallel.prototype.init = function(){
    d3.select("#clear").selectAll("g").selectAll("*").exit().remove();
    var margin = {top: 30, right: 10, bottom: 10, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().rangePoints([0, width], 1),
        y = {},
        yscale = {};

    var line = d3.svg.line(),
        axis = d3.axisLeft(),
        background,
        foreground;

    cars= listInfo;
    console.log("parallel is getting below data");
    console.log(cars);

        //console.log("here is the data for the parallel");
        //console.log(cars);

        // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = d3.keys(cars[0]).filter(function(d) {
            return d != "SCHOOL" && (y[d] = d3.scaleLinear()
                    .domain(d3.extent(cars, function(p) { return +p[d]; }))
                    .range([height, 0]));
        }));

        // Add grey background lines for context.
        background = d3.select("#paxes").append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(cars);

    background.exit().remove();
    background_enter=background.enter().append("path");
    background=background.merge(background_enter);
    background.attr("d", path);


    // Add blue foreground lines for focus.
        foreground = d3.select("#paxes").append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(cars);
          foreground.exit().remove();
           foreground_enter = foreground.enter().append("path");
    foreground = foreground.merge(foreground_enter);

           foreground .attr("d", path)
            .classed("actpath",true)
            .attr("id",function(d,i){return d.SCHOOL;})
        ;



        d3.selectAll(".foreground").selectAll("path").on("mouseover",function(d,i){return console.log(d.SCHOOL);});



        // Add a group element for each dimension.
        var g = d3.select("#paxes").selectAll(".dimension")
                .data(dimensions);
    g.exit().remove();
                g_enter=g.enter().append("g");
    g= g.merge(g_enter);
                g.attr("class", "dimension")
                .attr("transform", function(d,i) { return "translate(" + x(d) + ")"; })
            /*.call(d3.drag()
             .origin(function(d) { return {x: x(d)}; })
             .on("dragstart", function(d) {
             dragging[d] = x(d);
             background.attr("visibility", "hidden");
             })
             .on("drag", function(d) {
             dragging[d] = Math.min(width, Math.max(0, d3.event.x));
             foreground.attr("d", path);
             dimensions.sort(function(a, b) { return position(a) - position(b); });
             x.domain(dimensions);
             g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
             })
             .on("dragend", function(d) {
             delete dragging[d];
             transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
             transition(foreground).attr("d", path);
             background
             .attr("d", path)
             .transition()
             .delay(500)
             .duration(0)
             .attr("visibility", null);
             }))*/
            ;

        // Add an axis and title.
        g.append("g")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })

            .append("text")
              .classed("axis",true)
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; })
            .style("fill","black");


        // Add and store a brush for each axis.
        g.append("g")
            .attr("class", "brush")
            .each(function(d) { d3.select(this).call(y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); })
            .selectAll("rect")
            .style("visibility", null)
            .attr("x", -23)
            .attr("width", 36)
            .append("title")
            .text("Drag up or down to brush along this axis");

        g.selectAll(".extent")
            .append("title")
            .text("Drag or resize this filter");







// Returns the path for a given data point.
    function path(d) {
        return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

// Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
            extents = actives.map(function(p) { return y[p].brush.extent(); });
        foreground.style("display", function(d) {
            return actives.every(function(p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }
count=0;

}
