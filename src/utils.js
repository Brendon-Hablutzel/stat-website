
const getSum = arr => {
    return arr.reduce((prev, current) => prev += current);
}

const getMean = arr => {
    return getSum(arr) / arr.length;
}

// sample standard deviation
const getStdDev = arr => {
    const mean = getMean(arr);
    return (getSum(arr.map(item => (mean - item) ** 2)) / (arr.length - 1)) ** (1/2);
}

const getMedian = arr => {
    const lengthModTwo = arr.length % 2;
    // check for parity
    if (lengthModTwo === 1) {
        // if odd
        const middleIndex = Math.floor(arr.length / 2); // floor since array indeces start at 0
        return arr[middleIndex];
    } else {
        // if even
        const higherMiddleIndex = arr.length / 2; // higher since array indeces start at 0
        const lowerMiddleIndex = higherMiddleIndex - 1;
        return getMean([arr[lowerMiddleIndex], arr[higherMiddleIndex]]);
    }
}

const getMin = arr => {
    return arr.reduce((prev, current) => prev > current ? current : prev);
}

const getMax = arr => {
    return arr.reduce((prev, current) => prev < current ? current : prev);
}

const getQ1 = arr => {
    const halfLength = Math.floor(arr.length / 2);
    const firstHalf = arr.slice(0, halfLength);
    return getMedian(firstHalf);
}

const getQ3 = arr => {
    const halfLength = Math.floor(arr.length / 2);
    const firstHalf = arr.slice(-halfLength);
    return getMedian(firstHalf);
}

const zScoreToActual = (zScore, mean, stdDev) => {
    return mean + zScore * stdDev;
}

const actualToZScore = (actual, mean, stdDev) => {
    return (actual - mean) / stdDev;
}

// inclusive
const numValuesBetween = (arr, min, max) => {
    return arr.filter(item => item >= min && item <= max).length;
}

const standardize = arr => {
    const mean = getMean(arr);
    const stdDev = getStdDev(arr);
    return arr.map(item => (item - mean) / stdDev);
}

export { getSum, getMean, getStdDev, getMedian, getMin, getMax, getQ1, getQ3, numValuesBetween, zScoreToActual, actualToZScore, standardize }