import ReactApexChart from "react-apexcharts";
import { count, getFreedmanDiaconisWidth, getMax, getMedian, getMin, getOutliers, getQ1, getQ3, numInBin, roundTwo } from "./utils";


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
        }
    }
    const series = [
        {
            name: 'box',
            type: 'boxPlot',
            data: [
                {
                    x: "data",
                    y: fiveNumSummary
                }
            ]
        },
        {
            name: 'outliers',
            type: 'scatter',
            data: outliers
        }
    ]
    console.log(series)
    return (
        <ReactApexChart options={options} series={series} type="boxPlot" height={height} />
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
            type: 'bar',
            width: '100%'
        },
        dataLabels: {
            enabled: false
        },
        bar: {
            columnWidth: '100%',
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

const DotPlot = ({ dataList, height }) => {
    const options = {
        chart: {
            type: 'scatter'
        },
        xaxis: {
            tickAmount: 10,
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

export { BoxPlot, Histogram, DotPlot }