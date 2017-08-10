import d3 from 'd3'

/*
	base on  d3.js-v3
*/

class AtlasChart {
	constructor(props) {
		this.props = props;
		this.container = props.container;
		this.orgData = props.atlasData;
		this.width = (props.options && props.options.width) || this.container.clientWidth;
		this.height = (props.options && props.options.height) || this.container.clientHeight;

	  const defaultOption = {
	    zoom: {
	      scale:0.8, 
	      x:this.width/2, 
	      y:this.height/2
	    }
	  }
		this.options = Object.assign(defaultOption, props.options);

		this.init();
	}

	init() {
		const chartData = this.orgData;
		this.renderChart(chartData);
	}

	renderChart(chartData) {
		const _this = this;
		const W = this.width,
			H = this.height,
			rx = W / 2,
			ry = H / 2; 
		const n = {
      margin: 0,
      radiusR: 130
    };
    const Roate = _this.options.zoom.rotate;

		const color = ['#1f77b4', '#778ae6', '#b46bc5', '#eda61d', '#c3d41b', '#91dc8a', '#24a6da', '#aec7e8', '#ff9896', '#2ca02c'];

		d3.select(this.container).html('');

		var cluster = d3.layout.cluster()
    .size([360, ry - 30])
    .separation(function(e, t) {
      return (e.parent == t.parent ? 1 : 2) / e.depth
    })
    .sort(null);

    var lineScale = d3.scale.linear().domain([0, 2]).range([10, 7]);
		var diagonal = d3.svg.diagonal.radial()
    	.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

		function zoom() {
			// console.log(d3.event)
      _this.options.zoom.x = d3.event.translate[0];
      _this.options.zoom.y = d3.event.translate[1];
      _this.options.zoom.scale = d3.event.scale;
    
      svg_center.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

		const zoomListener = d3.behavior.zoom()
      .scaleExtent([0.1, 3])
      .scale(_this.options.zoom.scale)
      .translate([_this.options.zoom.x,_this.options.zoom.y])
      .on("zoom", zoom);

    // 自定义提示框
    let tip = d3.select(this.container)
      .append("div")
      .attr('class','tooltips');
		
		let svg = d3.select(this.container)
			.append('svg')
			.attr('width', W)
			.attr('height', H)
			.attr('id', 'atlas-chart')
			.call(zoomListener)
			.on('dblclick.zoom', null);

		let svg_center = svg.append('g')
			.attr('id','svg_center')
			.attr("transform", "translate(" + [_this.options.zoom.x, _this.options.zoom.y] + ")scale(" + _this.options.zoom.scale + ")" );

		let nodes = cluster.nodes(chartData);

		nodes.forEach(function(d) {
      d.y = n.radiusR * d.depth,
      d.depth != 0 && (d.x += Roate,
      d.x >= 360 ? d.x -= 360 : d.x < 0 && (d.x += 360))
    });

		let link = svg_center.selectAll("path.link")
      .data(cluster.links(nodes))
      .enter().append("svg:path")
      .attr("class", "link")
      .attr("d", diagonal)
      .style('stroke', d => {
      	return d.target.color ? d.target.color : color[d.target.group]
      });

  	let node = svg_center.selectAll("g.node")
      .data(nodes)
      .enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return d.parent ? "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" : ''; })
      .on('mouseover', (d) => {
        d3.event.stopPropagation();
        tip.html(`${d.node_name}`)
          .style('left', `${d3.mouse(this.container)[0] + 20}px`)
          .style('top', `${d3.mouse(this.container)[1] + 20}px`)
          .style('display', 'block')
      })
      .on('mousemove', () => {
        tip.style('left', `${d3.mouse(this.container)[0] + 20}px`)
          .style('top', `${d3.mouse(this.container)[1] + 20}px`)
      })
      .on('mouseout', () => {
        tip.style('display', 'none')
      });

    node.append("svg:circle")
      .attr("r", 6)
      .attr('class', d => {
      	return d.depth == 1 || d.depth == 0 ? 'node_breath': ''
      })
      .style('fill', d => {
      	return d.color? d.color : color[d.group]
      });

  	node.append("svg:text")
  		.attr('class', 'node-text')
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", d => {
      	return d.depth?".31em":'-1.5em'
      })
      .attr("text-anchor", function(d) { return d.parent ? d.x < 180 ? "start" : "end" : "start"; })
      .attr("transform", function(d) { 
      	let t =  "rotate(180)"
      	if(d.depth) {
      		t = d.x < 180 ? null : "rotate(180)"; 
      	}
      	else {
      		t = 'translate(' + (-(d.node_name.length * 12 / 2)) + ")";
      	}

      	return t
      })
      .text(function(d) { 
      	return d.node_name.length > 10 ? d.node_name.slice(0, 10) + '...' : d.node_name      	
      });

	}
}

export default AtlasChart