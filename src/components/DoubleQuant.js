import Chart from "react-apexcharts";
import { roundTwo, getStdDev, fileUploaded, getMean, getMin, getMax } from '../utils';
import { useRef, useState } from 'react';

export default function DoubleQuant() {
    const [data, setData] = useState(null);

    const [regressionOutput, setRegressionOutput] = useState("");

    const categoryOneInputRef = useRef(null);
    const categoryTwoInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileInput = (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2 style={{textAlign: "center"}}>Input from file</h2>
            <br />
            <input
                type="file"
                name="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ fontSize: "20px" }}
            />
            <input
                type="text"
                placeholder="Column One Name"
                ref={categoryOneInputRef}
                style={{ fontSize: "20px" }}
            />
            <input
                type="text"
                placeholder="Column Two Name"
                ref={categoryTwoInputRef}
                style={{ fontSize: "20px" }}
            />
            <button
                onClick={e => {
                    if (categoryOneInputRef.current.value && categoryTwoInputRef.current.value) {
                        fileUploaded(
                            fileInputRef, 
                            [categoryOneInputRef.current.value, categoryTwoInputRef.current.value], 
                            setData
                        );
                    } else {
                        console.error("No category inputted");
                    }
                }}
                style={{ fontSize: "20px" }}
            >
                Upload Data
            </button>
        </div>
    );
    
    const textOneDataInputRef = useRef(null);
    const textTwoDataInputRef = useRef(null);
    const textDataInput = (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2 style={{textAlign: "center"}}>Input from text (values separated by spaces)</h2>
            <br />
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <input 
                        type="text"
                        name="textOne"
                        ref={textOneDataInputRef}
                        style={{ fontSize: "20px" }}
                    />
                    <input 
                        type="text"
                        name="textTwo"
                        ref={textTwoDataInputRef}
                        style={{ fontSize: "20px" }}
                    />
                    <button
                        onClick={e => {
                            if (textOneDataInputRef.current.value && textTwoDataInputRef.current.value) {
                                let parsedInputOne = textOneDataInputRef.current.value
                                    .split(" ")
                                    .map(str => parseFloat(str));
                                let parsedInputTwo = textTwoDataInputRef.current.value
                                    .split(" ")
                                    .map(str => parseFloat(str));
                                if (parsedInputOne.includes(NaN) || parsedInputTwo.includes(NaN)) {
                                    console.error("Only integers and floats may be inputted")
                                } else if (parsedInputOne.length !== parsedInputTwo.length) {
                                    console.error("Text input lists must be of the same length")
                                } else {
                                    let parsedData = parsedInputOne.map(
                                        (_, index) => [parsedInputOne[index], parsedInputTwo[index]]
                                    );
                                    parsedData.sort((a, b) => a[0]-b[0]);
                                    setData(parsedData);
                                }
                            } else {
                                console.error("No data inputted");
                            }
                        }}
                        style={{ fontSize: "20px" }}
                    >
                        Upload Data
                    </button>
                </div>
            </div>
        </div>
    );
    
    const headerObj = <h1 style={{textAlign: "center"}}>Two Quantitative Variables</h1>;

    if (!data) {
        return (
            <div style={{ padding: "10px" }}>
                {headerObj}
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    {fileInput}
                </div>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    {textDataInput}
                </div>
            </div>
        );
    } else {

        const xList = data.map(([x, y]) => x);
        const yList = data.map(([x, y]) => y);

        const stdDevX = getStdDev(xList);
        const stdDevY = getStdDev(yList);
        const meanX = getMean(xList);
        const meanY = getMean(yList);

        const n = data.length;

        const r = Math.pow((n - 1) * stdDevX * stdDevY, -1) * data.reduce(
            (prev, [x, y]) => prev += (x - meanX) * (y - meanY), 0
        );
        
        const m = r * (stdDevY / stdDevX);
        const b = meanY - m * meanX;

        function LSRL(x) { return m * x + b };

        const regressionData = data.map(([x, y]) => ({ x, y: LSRL(x) }));

        const residuals = data.map(([x, y]) => ({ x, y: y - LSRL(x) }));

        const scatterplotSeries = [
            {
                name: "data",
                type: "scatter",
                data: data.map(([x, y]) => ({ x, y }))
            },
            {
                name: "best-fit",
                type: "line",
                data:  regressionData
            },
            {
                name: "residual",
                type: "scatter",
                data: residuals
            }
        ];

        const scatterplotOptions = {
            chart: {
                height: 350,
                type: "line"
            },
            fill: { type: "solid" },
            markers: { size: [6, 0, 0] },
            legend: { show: false },
            xaxis: { type: "numeric" },
            yaxis: {
                labels: { formatter: roundTwo },
                min: getMin(yList),
                max: getMax(yList)
            }
        };
        
        const residualplotSeries = [
            {
                name: "residuals",
                type: "scatter",
                data: residuals
            }
        ]; 
        
        const residualplotOptions = {
            chart: {
                height: 350,
                type: "line"
            },
            yaxis: {
                labels: {formatter: roundTwo}
            },
            xaxis: {
                tickAmount: 6
            }
        };

        return (
            <div style={{ padding: "10px" }}>
                {headerObj}
                <h2>Scatterplot</h2>
                <Chart options={scatterplotOptions} series={scatterplotSeries} type="line" width="500" />
                <p>n = {n}</p>
                <p>Least-Squares Regression Line Equation: <strong>{m} * x + {b}</strong></p>
                <div style={{ fontSize: "20px" }}>
                    X: <input
                        type="number"
                        placeholder="x"
                        onChange={e => {
                            const x = e.target.value;
                            if (x !== "") {
                                setRegressionOutput(LSRL(x));
                            } else {
                                setRegressionOutput("");
                            }
                        }}
                    />
                    <br />
                    Y: <strong>{regressionOutput}</strong>
                </div>
                <h2>Residual Plot</h2>
                <Chart
                    options={residualplotOptions}
                    series={residualplotSeries}
                    type="scatter" 
                    width="500"
                /> 
                <h2>Correlation</h2>
                <p>Correlation coefficient, r = {r}</p>
                <p>Coefficient of determination, r-squared = {r * r}</p>
            </div>
        )
    }
}