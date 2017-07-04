<template>
    <svg class="chart"></svg>
</template>

<script>
    export default {
        props: [
            'weather'
        ],
        data() {
            return {
                data: [],
                chart: {
                    selector: {},
                    body: {},
                    width: 500,
                    height: 420,
                    margin: 20,
                    padding: 2,
                    colors: () => {}
                },
                axis: {
                    x: () => {},
                    xLength: null,
                    y: () => {},
                    yLength: null
                },
                scale: {
                    x: () => {},
                    y: () => {}
                },
                rendered: false
            }
        },
        mounted() {
            this.init()
        },
        watch: {
            'weather': 'render'
        },
        methods: {
            init() {
                this.chart.selector = this.$d3.selectAll(".chart")
                    .attr("height", this.chart.height)
                    .attr("width", this.chart.width);

                this.axis.xLength = this.chart.width - 2 * this.chart.margin;
                this.axis.yLength = this.chart.height - 2 * this.chart.margin;
            },
            render() {
                let _ = this

                if (this.rendered) {
                    this.update()
                    return
                }

                this.data = _.weather.map((item) => {
                    return {
                        temp: item.temp,
                        date: item.date
                    }
                })

                this.scale.x = this.$d3.scaleBand()
                    .rangeRound([0, _.axis.xLength + _.chart.margin], .1)
                    .domain(_.data.map(function(d) {  return d.date; }));

                this.scale.y = this.$d3.scaleLinear()
                    .domain([40, 0])
                    .range([0, this.axis.yLength]);

                this.axis.x = this.$d3.axisBottom(this.scale.x)
                this.axis.y = this.$d3.axisLeft(this.scale.y)

                this.chart.colors = this.$d3.scaleOrdinal(this.$d3.schemeCategory20)

                this.chart.selector.append("g")
                    .attr("class", "x-axis")
                    .attr("transform",
                        "translate(" + _.chart.margin + "," + (_.chart.height - _.chart.margin) + ")")
                    .call(_.axis.x);

                this.chart.selector.append("g")
                    .attr("class", "y-axis")
                    .attr("transform",
                        "translate(" + _.chart.margin + "," + _.chart.margin + ")")
                    .call(_.axis.y);

                this.$d3.selectAll("g.y-axis g.tick")
                    .append("line")
                    .classed("grid-line", true)
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", _.axis.xLength + _.chart.margin)
                    .attr("y2", 0);

                this.chart.body = _.chart.selector.append("g")
                    .attr("class", "body")
                    .attr("transform",
                        "translate(" + _.chart.margin + ", 0 )");

                this.chart.body.selectAll("rect.bar")
                    .data(_.data)
                    .enter()
                    .append("rect")
                    .attr("class", "bar");

                this.chart.body.selectAll("rect.bar")
                    .data(_.data)
                    .attr("x", function (d) {
                        return _.scale.x(d.date)
                    })
                    .attr("y", function () {
                        return _.chart.height - _.chart.margin;
                    })
                    .attr("width", function(d) {
                        return _.scale.x.bandwidth(d.date)
                    })
                    .attr("fill", function(d, i) { return _.chart.colors(d.date) })
                    .transition()
                    .duration(1000)
                    .delay(200)
                    .attr("y", function (d) {
                        return _.scale.y(d.temp) + _.chart.margin;
                    })
                    .attr("height", function (d) {
                        return _.axis.yLength - _.scale.y(d.temp);
                    })

                this.rendered = true
            },
            update() {
                let _ = this

                this.data = _.weather.map((item) => {
                    return {
                        temp: item.temp,
                        date: item.date
                    }
                })

                this.chart.body.selectAll("rect.bar")
                    .data(_.data)
                    .transition()
                    .duration(1000)
                    .delay(200)
                    .attr("y", function (d) {
                        return _.scale.y(d.temp) + _.chart.margin;
                    })
                    .attr("height", function (d) {
                        return _.axis.yLength - _.scale.y(d.temp);
                    })
            }
        }
    }
</script>

<style>
    .axis path, .axis line {
        fill: none;
        stroke: #333;
    }
    .y-axis .grid-line {
        stroke: #000;
        stroke-opacity: 0.2;
        stroke-width: 1px;
    }
    .axis text {
        font: 10px Verdana;
    }
    .bar {
        stroke: none;
    }
    .text {
        fill: #fff;
        font-size: 10px;
    }
</style>