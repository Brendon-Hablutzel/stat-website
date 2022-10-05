import ReactApexChart from "react-apexcharts";
import { 
    count, 
    getFreedmanDiaconisWidth, 
    getMax, 
    getMedian, 
    getMin, 
    getOutliers, 
    getQ1, 
    getQ3, 
    numInBin, 
    roundTwo 
} from "./../utils";


const BoxPlot = ({ dataList, height, outliersList=null }) => {
    if (!outliersList) {
        outliersList = getOutliers(dataList);
    }
    const dataNoOutliers = dataList.filter(item => !outliersList.includes(item));
    const fiveNumSummary = [
        getMin(dataNoOutliers),
        getQ1(dataNoOutliers),
        getMedian(dataNoOutliers),
        getQ3(dataNoOutliers),
        getMax(dataNoOutliers)
    ]
    const outliers = outliersList.map(num => {
        return {
            x: "data",
            y: num
        }
    })
    const options = {
        chart: {
            type: 'boxPlot',
        },
        tooltip: {
            shared: false,
            intersect: true
        },
        stroke: {
          colors: ['#6c757d']
        },
        legend: {
            show: false
        }
    }
    let series = [
        {
            name: 'box',
            type: 'boxPlot',
            data: [
                {
                    x: "data",
                    y: fiveNumSummary
                }
            ]
        }
    ]
    outliers.forEach(outlier => {
        series.push({
            type: 'scatter',
            data: [outlier]
        });
    })
    return (
        <ReactApexChart options={options} series={series} type="boxPlot" height={height} />
    );
}


// the following is an old version of the histogram
// while it has neater x labels, there are spaces between the bars
/*
const BarAsHistogram = ({ dataList, height }) => {
    const binWidth = getFreedmanDiaconisWidth(dataList);
    const minimum = getMin(dataList);
    const maximum = getMax(dataList)
    const numBins = Math.ceil((maximum - minimum) / binWidth);
    const binIntervals = [...Array(numBins).keys()].map(
        binNumber => [minimum + binNumber * binWidth, minimum + (binNumber + 1) * binWidth]
    );
    const options = {
        chart: {
            type: 'bar'
        },
        dataLabels: {
            enabled: false,
        },
        bar: {
            columnWidth: '100%'
        },
        xaxis: {
            tickAmount: numBins,
        }
    }
    // bins include min, exclude max
    const series = [{
        name: "data",
        data: binIntervals.map(([binMin, binMax]) => {
            return {
                x: `${roundTwo(binMin)}-${roundTwo(binMax)}`,
                y: numInBin(dataList, binMin, binMax)
            }
        })
    }]
    return (
        <ReactApexChart options={options} series={series} type="bar" height={height} />
    );
}
*/

const DotPlot = ({ dataList, height }) => {
    const options = {
        chart: {
            type: 'scatter'
        },
        xaxis: {
            tickAmount: 30,
            decimalsInFloat: 2,
            type: "numeric"
        }
    }
    const series = [{
        name: 'data',
        data: dataList.map((item, index) => [item, count(dataList.slice(0, index+1), item)])
    }]
    return (
        <ReactApexChart options={options} series={series} type="scatter" height={height} />
    );
}


const Histogram = ({ dataList, height }) => {
    const binWidth = getFreedmanDiaconisWidth(dataList);
    const minimum = getMin(dataList);
    const maximum = getMax(dataList)
    const numBins = Math.ceil((maximum - minimum) / binWidth);
    const binIntervals = [...Array(numBins).keys()].map(
        binNumber => [minimum + binNumber * binWidth, minimum + (binNumber + 1) * binWidth]
    );
    const options = {
        chart: {
            type: 'bar'
        },
        dataLabels: {
            enabled: true,
            // the following can be used to label the bars with their ranges
            // formatter: (_val, opts) => {
            //     const intervals = binIntervals[opts.seriesIndex];
            //     return `${roundTwo(intervals[0])} - ${roundTwo(intervals[1])}`
            // }
        },
        bar: {
            columnWidth: '100%'
        },
        xaxis: {
            tickAmount: numBins,
            categories: ["data"],
            labels: {
                show: false
            }
        }
    }
    // bins include min, exclude max
    const series = binIntervals.map(([binMin, binMax]) => {
        return {
            name: `${roundTwo(binMin)}-${roundTwo(binMax)}`,
            data: [numInBin(dataList, binMin, binMax)]
        }
    })
    return (
        <ReactApexChart options={options} series={series} type="bar" height={height} />
    );
}


export { BoxPlot, Histogram, DotPlot }