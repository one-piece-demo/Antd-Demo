import d3 from 'd3'
import {tools} from 'utils'
/*
	base on  d3.js-v4
*/

class pullChart {
	constructor(props) {
		this.props = props;
		this.container = props.container;
		this.orgData = props.pullData;
		this.width = (props.options && props.options.width) || this.container.clientWidth;
		this.height = (props.options && props.options.height) || this.container.clientHeight;

	  const defaultOption = {
	    zoom: {
	      scale:0.8, 
	      x:0, 
	      y:0
	    }
	  }
		this.options = Object.assign(defaultOption, props.options);

		this.init();
	}

	init() {
		const chartData = this.orgData;
		chartData.relations && chartData.relations.length && this.renderChart(chartData);
	}

	renderChart(chartData) {
		const _this = this;
		const W = this.width,
			H = this.height;
		const n = {
      margin: 0,
      radiusR: 120
    };

    chartData.obj.pos = [W / 2, H/2];

		const color = ['#1f77b4', '#778ae6', '#b46bc5', '#eda61d', '#c3d41b', '#91dc8a', '#24a6da', '#aec7e8', '#ff9896', '#2ca02c'];

		d3.select(this.container).html('');

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

    
    svg_center.append("circle")
      .attr("cx", chartData.obj.pos[0])
      .attr("cy", chartData.obj.pos[1])
      .attr("r", n.radiusR)
      .attr("fill", function (d) {
        return color[0]
      }).style("opacity", "0.5");

    var text = svg_center.append('text')
      .attr('text-anchor', 'middle')
      .attr("x", chartData.obj.pos[0])
      .attr("y", chartData.obj.pos[1])
      .text(function(){ 
        var name = '';
        if(chartData.obj['name'] === '(手机)' || chartData.obj['name'] === '(身份证)' ){
          name = 'MD5'+chartData.obj['name'];
        }
        else{
          name = chartData.obj['name'];
        }
        return name;
      })
      .style('font-size','18px').style('fill', '#fff')
    text.append('tspan').attr('x',chartData.obj.pos[0]).attr('dy','1.4em').text(function(){ return tools.numPoints(chartData.obj['value'])})
    var nodeLinear=d3.scale.linear()
      .domain([
       0,
        d3.max(chartData.relations, function(d) {
          // if(d.distance<d.value) {
          //   return Math.sqrt(d.value); 
          // }
          // else {
          //   return Math.sqrt(d.distance); 
          // }
           return d.value //return Math.sqrt(d.value);         
        })            
      ])
      .range([40, 80]);
		
      var len = chartData.relations.length;
      var t = (2*Math.PI/len);
      var r0 = 0;
      //console.log(t.toFixed(2))
      for(var i = 0; i < len; i++) {
       // var r0 = nodeLinear(Math.sqrt(chartData.relations[i].value)) - 2*nodeLinear(Math.sqrt(chartData.relations[i].distance)) + r;
        var num = (chartData.relations[i].distance/chartData.obj['value']*nodeLinear(chartData.relations[i].value)*2)
        if( !num ){
          num = 0;
        }
        if(num > 0){
          r0 = 80+nodeLinear(chartData.relations[i].value)-num
        }
        else{
          r0 = 90+nodeLinear(chartData.relations[i].value)-num
        }
        var x = chartData.obj.pos[0] + Number(Math.cos(i*t)*(r0));
        var y = chartData.obj.pos[1] + Number(Math.sin(i*t)*(r0));
        chartData.relations[i].pos = [x, y];      
      } 
      console.log(chartData)
      var node_g = svg_center.selectAll('nodes').data(chartData.relations).enter().append("g").attr('class','nodes')
      .on('click', function(d,i){
        var name = '';
        if( d.name === 'MD5(手机)' ){
          name = '(手机)'
        }
        else if(d.name === 'MD5(身份证)'){
          name = '(身份证)'
        }
        else{
          name = d.name
        }
        _this.props.formatData(name);

      })
      .on('mouseover', tipFn())
      .on('mousemove',tipFn())
      .on('mouseout',function(){ 
        tip.style('display','none').style('left','0');
      });

      function tipFn() {
        return function(d,i){
          d3.event.stopPropagation();
          var num = tools.toRound(d.distance/chartData.obj['value']*100,2)
          if( !num ){
            num = 0
          }
          if( d.name.indexOf('手机') == 1 ||  d.name.indexOf('身份证') == 1 ){
            d.name = 'MD5'+d.name;
          }

          tip.html(`${d.name}<br/>打通数:${d.value}`)
            .style('left', `${d3.mouse(_this.container)[0] + 20}px`)
          .style('top', `${d3.mouse(_this.container)[1] + 20}px`)
           .style('display','block')
        }
      }
      
      var circles = node_g.append("circle")
        .attr("cx", function(d,i){
          //console.log(Number(Math.cos(i*d.distance)))
          //var n = nodeLinear(chartData.relations[i].value)+r;
          return d.pos[0]
        })
        .attr("cy", function(d,i){
            return d.pos[1]
        })
        .attr("r", function(d){
          var r = nodeLinear(d.value);
          return  r;
        })
        .style("opacity", "0.5").attr('cursor','pointer')
        .attr("fill", function (d,i) {
            return color[i+1]
        })
        .on('mouseover', function(){
          d3.select(this).style('opacity',0.7)
        })
        .on('mouseout', function(){
          d3.select(this).style('opacity',0.5)
        })

      var texts = node_g.append("text")
        .attr('text-anchor', 'middle').attr('cursor', 'pointer')
        .attr("x", function(d){
            return d.pos[0];
        })
        .attr("y", function(d){
            return d.pos[1];
        })
        .style({
          fill:'#fff'
        })
        .text(function(d){
          if( d.name.indexOf('手机') == 1 ||  d.name.indexOf('身份证') == 1 ){
            return 'MD5'
          }
        });
        var tspan = texts.append('tspan')
          .attr('dy', function(d){
            if( d.name.indexOf('手机') == 1 ||  d.name.indexOf('身份证') == 1 ){
              return '1.4em';
             }
             return 0;
            
          })
          .attr('x',function(d){return d.pos[0]})
          .text(function(d) {
            return d.name
        });

	}
}

export default pullChart