import ReactApexChart from "react-apexcharts";
import { getFreedmanDiaconisWidth, getMax, getMin, numInBin } from "./utils";


const BoxPlot = ({ fiveNumSummary, height, outliersList }) => {
    const outliers = outliersList.map(num => {
        return {
            x: "data",
            y: num
        }
    })
    const options = {
        chart: {
            type: 'boxPlot',
            // height: 500
        },
        colors: ['#008FFB', '#FEB019'],
        title: {
            text: 'Boxplot',
            align: 'left'
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
        data: binIntervals.map(([binMin, binMax]) => {
            return {
                x: `${binMin}-${binMax}`,
                y: numInBin(dataList, binMin, binMax)
            }
        })
    }]
    return (
        <ReactApexChart options={options} series={series} type="bar" height={height} />
    );
}

export { BoxPlot, Histogram }