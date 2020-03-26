import { ContoursConfig, ContoursMargin } from './type';
export const DEFAULT_CONTOUR_MARGIN: ContoursMargin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
}
export const NOOP:Function = ()=>{};
export const DEFAULT_CONTOUR_CONFIG: ContoursConfig = {
    el: null,
    data: [],
    margin: DEFAULT_CONTOUR_MARGIN,
    width: 600,
    height: 600,
    xAlias: '',
    yAlias: '',
    title: '',
    bandwidth: 30,
    threshold: 30,
    tooltip: NOOP
}