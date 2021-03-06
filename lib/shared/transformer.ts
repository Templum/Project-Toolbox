import { TimeUnit } from '../analytics/measure';

const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;
const NS_PER_MIN = 6e+10;

function getMultiplikator(unit: TimeUnit): number {
    switch (unit) {
        case TimeUnit.Nanosecond:
            return 1;
        case TimeUnit.Millisecond:
            return NS_PER_MS;
        case TimeUnit.Second:
            return NS_PER_SEC;
        case TimeUnit.Minute:
            return NS_PER_MIN;
    }
}

export function transformTo(unit: TimeUnit): ([s, ns]: [number, number]) => number {
    const multiplikator = getMultiplikator(unit);
    return function ([s, ns]: [number, number]) {
        const totalInNS = s * NS_PER_SEC + ns;
        return Math.floor(totalInNS / multiplikator);
    };
}
