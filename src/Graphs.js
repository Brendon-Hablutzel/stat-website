import ReactApexChart from "react-apexcharts";


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

export { BoxPlot }