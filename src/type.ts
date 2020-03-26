export declare interface ContoursConfig {
    el: string|null;
    margin: ContoursMargin;
    width: number;
    height: number;
    xAlias: string;
    yAlias: string;
    title: string;
    data: Array<[number,number]>;
    tooltip: Function;
    bandwidth: number;
    threshold: number;
}
export declare interface ContoursMargin {
    top: number ;
    right: number;
    bottom: number;
    left: number;
}