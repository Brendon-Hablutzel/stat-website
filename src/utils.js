
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

const getMedian = sortedArr => {
    const lengthModTwo = sortedArr.length % 2;
    // check for parity
    if (lengthModTwo === 1) {
        // if odd
        const middleIndex = Math.floor(sortedArr.length / 2); // floor since array indeces start at 0
        return sortedArr[middleIndex];
    } else {
        // if even
        const higherMiddleIndex = sortedArr.length / 2; // higher since array indeces start at 0
        const lowerMiddleIndex = higherMiddleIndex - 1;
        return getMean([sortedArr[lowerMiddleIndex], sortedArr[higherMiddleIndex]]);
    }
}

const getMin = arr => {
    return arr.reduce((prev, current) => prev > current ? current : prev);
}

const getMax = arr => {
    return arr.reduce((prev, current) => prev < current ? current : prev);
}

const getQ1 = sortedArr => {
    const halfLength = Math.floor(sortedArr.length / 2);
    const firstHalf = sortedArr.slice(0, halfLength);
    return getMedian(firstHalf);
}

const getQ3 = sortedArr => {
    const halfLength = Math.floor(sortedArr.length / 2);
    const lastHalf = sortedArr.slice(-halfLength);
    return getMedian(lastHalf);
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

const getOutliers = (sortedArr, q1=null, q3=null) => {
    if (q1 === null || q3 === null) {
        q1 = getQ1(sortedArr);
        q3 = getQ3(sortedArr);
    }
    const interquartileRange = q3 - q1;
    const dist = 1.5 * interquartileRange;
    const lower = q1 - dist;
    const upper = q3 + dist;
    return sortedArr.filter(item => item < lower || item > upper);
}

export { getSum, getMean, getStdDev, getMedian, getMin, getMax, getQ1, getQ3, numValuesBetween, zScoreToActual, actualToZScore, standardize, getOutliers }