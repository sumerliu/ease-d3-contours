import { ContoursConfig, ContoursMargin } from './type';
import {
    DEFAULT_CONTOUR_MARGIN,
    DEFAULT_CONTOUR_CONFIG,
    NOOP
} from "./constant";
import * as d3 from 'd3';
import { ContourMultiPolygon } from "d3-contour";
class EaseD3Contours {
    private version: string = require("../package.json").version;
    private createdBy: string = "sumerliu@github.com";
    private config: ContoursConfig;
    private x: Function;
    private y: Function;
    yAxis: (g: any) => any;
    xAxis: (g: any) => any;
    color: d3.ScaleSequential<unknown>;
    contours: ContourMultiPolygon[];
    tooltip: any;
    constructor(config: ContoursConfig) {
        const _this = this;
        this.init();
        const tempMargin: ContoursMargin = { ...DEFAULT_CONTOUR_MARGIN, ...config.margin };
        this.config = { ...DEFAULT_CONTOUR_CONFIG, ...config };
        this.config.margin = tempMargin;
        this.config.tooltip = this.config.tooltip != NOOP ? this.config.tooltip : this.defaultTooltip;
        this.x = d3.scaleLinear()
            // @ts-ignore
            .domain(d3.extent(this.config.data, (d: [number, number]) => d[0])).nice()
            .rangeRound([<number>this.config.margin.left, this.config.width - <number>this.config.margin.right]);
        this.y = d3.scaleLinear()
            // @ts-ignore
            .domain(d3.extent(this.config.data, (d: [number, number]) => d[1])).nice()
            .rangeRound([this.config.height - <number>this.config.margin.bottom, <number>this.config.margin.top]);
        this.contours = d3.contourDensity()
            .x(d => this.x(d[0]))
            .y(d => this.y(d[1]))
            .size([config.width, config.height])
            .bandwidth(_this.config.bandwidth)
            .thresholds(_this.config.threshold)
            (config.data);
        // @ts-ignore
        this.color = d3.scaleSequential(d3.extent(this.contours, d => d.value), d3.interpolateYlGnBu);
        this.xAxis = g => g
            .attr("transform", `translate(0,${_this.config.height - _this.config.margin.bottom + 6})`)
            // @ts-ignore
            .call(d3.axisBottom(_this.x).ticks(20, ".1f"))
            .call((g: any) => g.select(".domain").remove())
            .call((g: any) => g.selectAll(".tick line").clone()
                .attr("y2", -config.height)
                .attr("stroke-opacity", 0.1))
            .call((g: any) => g.select(".tick:last-of-type text").clone()
                .attr("y", -3)
                .attr("dy", null)
                .attr("font-weight", "bold")
                .text(config.xAlias));
        this.yAxis = g => g
            .attr("transform", `translate(${_this.config.margin.left - 6},0)`)
            // @ts-ignore
            .call(d3.axisLeft(_this.y).ticks(20, ".1s"))
            .call((g: any) => g.select(".domain").remove())
            .call((g: any) => g.selectAll(".tick line").clone()
                .attr("x2", config.width)
                .attr("stroke-opacity", 0.1))
            .call((g: any) => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(config.yAlias));
        if (config.el) {
            d3.select(config.el).append(()=>{
                return this.chart();
            });
        } else {
            throw new Error("未挂载dom节点")
        }
    }

    defaultTooltip(d: ContourMultiPolygon) {
        // @ts-ignore
        return `<h5>${this.title}</h5><p>阈值为：${d.value}</p>`;
    }
    init() {
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip") //用于css设置类样式
            .attr("opacity", 0.0);
    }

    chart() {
        const _this = this;
        const svg = d3.create("svg")
            // @ts-ignore
            .attr("viewBox", [0, 0, _this.config.width, _this.config.height]);
        svg.append("g")
            .call(_this.xAxis);

        svg.append("g")
            .call(_this.yAxis);
        let geo = svg.append("g")
            .attr("fill", "none")
            .attr("stroke-linejoin", "round")
            .selectAll("path")
            .data(_this.contours)
            .join("path").on("mouseover", function (d: any) {
                let tooltipText = _this.config.tooltip(d);
                //设置tooltip文字
                _this.tooltip.html(tooltipText)
                    //设置tooltip的位置(left,top 相对于页面的距离) 
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("display", "block");
                // @ts-ignore
                d3.select(this).attr("fill-opacity", 0.2);
            })
            .on("mouseout", function (d: any) {
                _this.tooltip.style("display", "none");
                // @ts-ignore
                d3.select(this).attr("fill-opacity", 1);
            })
            .attr("fill", (d: any) => _this.color(d.value))
            // @ts-ignore
            .attr("stroke", (d: any): d3.LabColor => d3.lab(_this.color(d.value)).darker(1))
            .attr("stroke-width", (d: any, i: number) => i % 5 ? 0.25 : 1)
            .attr("d", d3.geoPath());


        return svg.node();
    }

}
module.exports = EaseD3Contours;