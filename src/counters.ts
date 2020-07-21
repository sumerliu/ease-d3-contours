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
        const grid = ((data:any)=>{
            const grid = data;
            const q = 4; // The level of detail, e.g., sample every 4 pixels in x and y.
            const x0 = -q / 2, x1 = this.config.width + 28 + q;
            const y0 = -q / 2, y1 = this.config.height + q;
            const n = Math.ceil((x1 - x0) / q);
            const m = Math.ceil((y1 - y0) / q);
            // const grid = new Array(n * m);
            // @ts-ignore
            grid.x = -q;grid.y = -q;grid.k = q;grid.n = n;grid.m = m;
            return grid;
            // @ts-ignore
          })(this.config.data);
          // @ts-ignore
        this.x = d3.scaleLinear([-2, 2], [0, this.config.width + 28])
        // @ts-ignore
        this.y = d3.scaleLinear([-2, 1], [this.config.height, 0])
        this.contours = d3.contours()
                // @ts-ignore
                .size([grid.n, grid.m])
                // @ts-ignore
                .thresholds(this.config.threshold)
            (grid).map(({type, value, coordinates}) => {
                return {type, value, coordinates: coordinates.map(rings => {
                  return rings.map(points => {
                    return points.map(([x, y]) => ([
                    // @ts-ignore
                      grid.x + grid.k * x,
                      // @ts-ignore
                      grid.y + grid.k * y
                    ]));
                  });
                })};
              });
        // @ts-ignore
        this.color = d3.scaleSequentialLog(d3.extent(this.config.thresholds), d3.interpolateMagma)
        this.xAxis = g => g
            .attr("transform", `translate(0,${this.config.height})`)
            // @ts-ignore
            .call(d3.axisTop(_this.x).ticks(this.config.width / this.config.height * 10))
            .call((g: any) => g.select(".domain").remove())
            // @ts-ignore
            .call((g: any) => g.selectAll(".tick").filter((d: any) => _this.x.domain().includes(d)).remove())
        this.yAxis = g => g
            .attr("transform", "translate(-1,0)")
            // @ts-ignore
            .call(d3.axisRight(_this.y))
            .call((g: any) => g.select(".domain").remove())
            // @ts-ignore
            .call((g: any) => g.selectAll(".tick").filter((d: any) => _this.y.domain().includes(d)).remove())
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
            .attr("viewBox", [0, 0, _this.config.width+ 28, _this.config.height])
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("width", "calc(100% + 28px)");
        svg.append("g")
            .call(_this.xAxis);

        svg.append("g")
            .call(_this.yAxis);
            
        svg.append("g")
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
            .attr("d", d3.geoPath());


        return svg.node();
    }

}
module.exports = EaseD3Contours;