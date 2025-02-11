import {valueOrDefault} from "chart.js/helpers";
import {DateTime} from 'luxon';
import colorLib, { Color, RGBA } from '@kurkle/color';
import 'chartjs-adapter-luxon';

var _seed = Date.now();

export function rand(min?: number, max?: number) {
    min = valueOrDefault(min, 0);
    max = valueOrDefault(max, 0);
    _seed = (_seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
}

// @ts-ignore
export function numbers(config) {
    var cfg = config || {};
    var min = valueOrDefault(cfg.min, 0);
    var max = valueOrDefault(cfg.max, 100);
    var from = valueOrDefault(cfg.from, []);
    var count = valueOrDefault(cfg.count, 8);
    var decimals = valueOrDefault(cfg.decimals, 8);
    var continuity = valueOrDefault(cfg.continuity, 1);
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + rand(min, max);
        if (rand() <= continuity) {
            data.push(Math.round(dfactor * value) / dfactor);
        } else {
            data.push(null);
        }
    }

    return data;
}


export const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

export function newDate(days: number | undefined) {
    return DateTime.now().plus({days}).toJSDate();
}

export function newDateString(days: number) {
    return DateTime.now().plus({days}).toISO();
}

export function transparentize(value: string | number[] | Color | RGBA, opacity: number | undefined) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}
