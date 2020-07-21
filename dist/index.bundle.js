!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DEFAULT_CONTOUR_MARGIN={top:20,right:30,bottom:30,left:40},e.NOOP=function(){},e.DEFAULT_CONTOUR_CONFIG={el:null,data:[],margin:e.DEFAULT_CONTOUR_MARGIN,width:600,height:600,xAlias:"",yAlias:"",title:"",bandwidth:30,threshold:30,tooltip:e.NOOP}},function(t,e){t.exports=d3},function(t){t.exports=JSON.parse('{"name":"ease-d3-contours","version":"0.0.1","description":"A easeily to add a contours to page by d3","main":"dist/index.js","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","build":"webpack --mode production --progress --display-modules --colors --display-reasons"},"repository":{"type":"git","url":"git+https://github.com/sumerliu/ease-d3-contours.git"},"keywords":["d3","contours"],"author":"Sumer Liu","license":"MIT","bugs":{"url":"https://github.com/sumerliu/ease-d3-contours/issues"},"homepage":"https://github.com/sumerliu/ease-d3-contours#readme","devDependencies":{"@types/d3":"^5.7.2","@types/node":"^13.9.0","clean-webpack-plugin":"^3.0.0","d3":"^5.15.0","expose-loader":"^0.7.5","jest":"^25.1.0","prettier":"^1.19.1","ts-jest":"^25.2.1","ts-loader":"^6.2.1","typescript":"^3.8.3","webpack":"^4.42.0","webpack-cli":"^3.3.11"}}')},function(t,e,n){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),a=i(n(1)),s=function(){function t(t){var e=this;this.version=n(2).version,this.createdBy="sumerliu@github.com";var i=this;this.init();var s=o(o({},r.DEFAULT_CONTOUR_MARGIN),t.margin);if(this.config=o(o({},r.DEFAULT_CONTOUR_CONFIG),t),this.config.margin=s,this.config.tooltip=this.config.tooltip!=r.NOOP?this.config.tooltip:this.defaultTooltip,this.x=a.scaleLinear().domain(a.extent(this.config.data,(function(t){return t[0]}))).nice().rangeRound([this.config.margin.left,this.config.width-this.config.margin.right]),this.y=a.scaleLinear().domain(a.extent(this.config.data,(function(t){return t[1]}))).nice().rangeRound([this.config.height-this.config.margin.bottom,this.config.margin.top]),this.contours=a.contourDensity().x((function(t){return e.x(t[0])})).y((function(t){return e.y(t[1])})).size([t.width,t.height]).bandwidth(i.config.bandwidth).thresholds(i.config.threshold)(t.data),this.color=a.scaleSequential(a.extent(this.contours,(function(t){return t.value})),a.interpolateYlGnBu),this.xAxis=function(e){return e.attr("transform","translate(0,"+(i.config.height-i.config.margin.bottom+6)+")").call(a.axisBottom(i.x).ticks(20,".1f")).call((function(t){return t.select(".domain").remove()})).call((function(e){return e.selectAll(".tick line").clone().attr("y2",-t.height).attr("stroke-opacity",.1)})).call((function(e){return e.select(".tick:last-of-type text").clone().attr("y",-3).attr("dy",null).attr("font-weight","bold").text(t.xAlias)}))},this.yAxis=function(e){return e.attr("transform","translate("+(i.config.margin.left-6)+",0)").call(a.axisLeft(i.y).ticks(20,".1s")).call((function(t){return t.select(".domain").remove()})).call((function(e){return e.selectAll(".tick line").clone().attr("x2",t.width).attr("stroke-opacity",.1)})).call((function(e){return e.select(".tick:last-of-type text").clone().attr("x",3).attr("text-anchor","start").attr("font-weight","bold").text(t.yAlias)}))},!t.el)throw new Error("未挂载dom节点");a.select(t.el).append((function(){return e.chart()}))}return t.prototype.defaultTooltip=function(t){return"<h5>"+this.title+"</h5><p>阈值为："+t.value+"</p>"},t.prototype.init=function(){this.tooltip=a.select("body").append("div").attr("class","tooltip").attr("opacity",0)},t.prototype.chart=function(){var t=this,e=a.create("svg").attr("viewBox",[0,0,t.config.width,t.config.height]);e.append("g").call(t.xAxis),e.append("g").call(t.yAxis);e.append("g").attr("fill","none").attr("stroke-linejoin","round").selectAll("path").data(t.contours).join("path").on("mouseover",(function(e){var n=t.config.tooltip(e);t.tooltip.html(n).style("left",a.event.pageX+"px").style("top",a.event.pageY+20+"px").style("display","block"),a.select(this).attr("fill-opacity",.2)})).on("mouseout",(function(e){t.tooltip.style("display","none"),a.select(this).attr("fill-opacity",1)})).attr("fill",(function(e){return t.color(e.value)})).attr("stroke",(function(e){return a.lab(t.color(e.value)).darker(1)})).attr("stroke-width",(function(t,e){return e%5?.25:1})).attr("d",a.geoPath());return e.node()},t}();t.exports=s}]);
//# sourceMappingURL=index.bundle.js.map