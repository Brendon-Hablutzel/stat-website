import { useRef, useState } from 'react';
import { actualToPercentile, 
    actualToZScore, 
    fileUploaded, 
    getMax, 
    getMean, 
    getMedian, 
    getMin, 
    getOutliers, 
    getQ1, 
    getQ3, 
    getStdDev, 
    numValuesBetween, 
    standardize, 
    zScoreToActual 
} from '../utils';
import { BoxPlot, DotPlot, Histogram } from './Graphs';

export default function SingleQuant() {
    const [data, setData] = useState(null);
    // for converters
    const [zScoreFromActualValue, setZScoreFromActualValue] = useState(null);
    const [actualValueFromZScore, setActualValueFromZScore] = useState(null);
    const [percentileFromActualValue, setPercentileFromActualValue] = useState(null);

    const categoryInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileInput = (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2 style={{ textAlign: "center" }}>Input from file</h2>
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
                placeholder="Column Name"
                ref={categoryInputRef}
                style={{ fontSize: "20px "}}
            />
            <button
                style={{ fontSize: "20px" }}
                onClick={e => {
                    if (categoryInputRef.current.value) {
                        fileUploaded(fileInputRef, [categoryInputRef.current.value], setData);
                    } else {
                        console.error("No category inputted");
                    }
                }}
            >
                Upload Data
            </button>
        </div>
    );
    
    const textDataInputRef = useRef(null);
    const textDataInput = (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <h2 style={{textAlign: "center"}}>Input from text (values separated by spaces)</h2>
            <br />
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <input 
                        type="text"
                        name="text"
                        ref={textDataInputRef}
                        style={{ fontSize: "20px" }}
                    />
                    <button
                        style={{ fontSize: "20px" }}
                        onClick={e => {
                            if (textDataInputRef.current.value) {
                                let parsedInput = textDataInputRef.current.value
                                    .split(" ")
                                    .map(str => parseFloat(str));
                                if (parsedInput.includes(NaN)) {
                                    console.error("Only integers and floats may be inputted")
                                } else {
                                    parsedInput.sort((a, b) => a-b);
                                    setData(parsedInput);
                                }
                            } else {
                                console.error("No data inputted");
                            }
                        }}
                    >
                        Upload Data
                    </button>
                </div>
            </div>
        </div>
    );
    
    const headerObj = <h1 style={{textAlign: "center"}}>One Quantitative Variable</h1>;

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
        const mean = getMean(data);
        const stdDev = getStdDev(data);
        const n = data.length;
        const outliers = getOutliers(data);
        // normality:
        const standardized = standardize(data);
        const withinOne = numValuesBetween(standardized, -1, 1);
        const withinTwo = numValuesBetween(standardized, -2, 2);
        const withinThree = numValuesBetween(standardized, -3, 3);
        return (
            <div style={{ padding: "10px" }}>
                {headerObj}
                <div style={{overflowWrap: "break-word"}}>Data: {JSON.stringify(data)}</div>
                <h2>Summary Statistics</h2>
                <ul style={{fontSize: "20px"}}>
                    <li>mean: {mean}</li>
                    <li>sample std dev: {stdDev}</li>
                    <li>min: {getMin(data)}</li>
                    <li>q1: {getQ1(data)}</li>
                    <li>med: {getMedian(data)}</li>
                    <li>q3: {getQ3(data)}</li>
                    <li>max: {getMax(data)}</li>
                    <li>n: {n}</li>
                    <li>outliers: {JSON.stringify(outliers)}</li>
                </ul>
                <h2>Plots</h2>
                <div style={{display: "flex", justifyContent:"center", height: "700px"}}>
                    <div style={{width: "80%", height: "100%"}}>
                        <div style={{height: "50%"}}>
                            <Histogram dataList={data} height="100%" />
                        </div>
                        <div style={{height: "50%"}}>
                            <DotPlot dataList={data} height="100%" />
                        </div>
                    </div>
                    <div style={{width: "20%"}}>
                        <BoxPlot dataList={data} outliersList={outliers} height="100%" />
                    </div>
                </div>
                <div>
                    <h2>Location</h2>
                    <h3>Convert z-score to actual value</h3>
                    <div style={{ fontSize: "20px" }}>
                        Z-Score: <input
                            type="number"
                            placeholder="z-score"
                            onChange={e => {
                                const enteredZScore = e.target.value;
                                if (enteredZScore !== "") {
                                    setActualValueFromZScore(
                                        zScoreToActual(
                                            parseFloat(enteredZScore),
                                            mean,
                                            stdDev
                                        )
                                    );
                                } else {
                                    setActualValueFromZScore(null);
                                }
                            }}
                        />
                        <br />
                        Actual Value: <strong>{actualValueFromZScore}</strong>
                    </div>
                    <h3>Convert actual value to z-score</h3>
                    <div style={{ fontSize: "20px" }}>
                        Actual Value: <input
                            type="number"
                            placeholder="actual value"
                            onChange={e => {
                                const enteredActual = e.target.value;
                                if (enteredActual !== "") {
                                    setZScoreFromActualValue(
                                        actualToZScore(
                                            parseFloat(enteredActual),
                                            mean,
                                            stdDev
                                        )
                                    );
                                } else {
                                    setZScoreFromActualValue(null);
                                }
                            }}
                        />
                        <br />
                        Z-Score: <strong>{zScoreFromActualValue}</strong>
                    </div>
                    <h3>Convert actual value to percentile</h3>
                    <div style={{ fontSize: "20px" }}>
                        Actual value: <input
                            type="number"
                            placeholder="actual value"
                            onChange={e => {
                                const enteredValue = e.target.value;
                                if (enteredValue !== "") {
                                    setPercentileFromActualValue(
                                        actualToPercentile(
                                            data,
                                            parseFloat(enteredValue)
                                        )
                                    );
                                } else {
                                    setPercentileFromActualValue(null);
                                }
                            }}
                        />
                        <br />
                        Percentile (proportion): <strong>{percentileFromActualValue}</strong>
                    </div>
                </div>
                <h2>Normality</h2>
                <ul style={{fontSize: "20px"}}>
                    <li>{withinOne}, or {withinOne / n * 100}% of values are within one s.d.</li>
                    <li>{withinTwo}, or {withinTwo / n * 100}% of values are within two s.d.</li>
                    <li>{withinThree}, or {withinThree / n * 100}% of values are within three s.d.</li>
                </ul>
            </div>
        );
    }
}