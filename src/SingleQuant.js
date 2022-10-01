import './SingleQuant.css';
import Papa from 'papaparse';
import { useRef, useState } from 'react';
import { getMax, getMean, getMedian, getMin, getQ1, getQ3, getStdDev, numValuesBetween, standardize } from './utils';


function SingleQuant() {
    const [data, setData] = useState(null);

    const fileUploaded = (fileUploadRef, columnName) => {
        Papa.parse(fileUploadRef.current.files[0], {
            header:true,
            skipEmptyLines:true,
            complete: function (results) {
                const receivedData = results.data;
                if (receivedData.length === 0) {
                    console.error("No data in file");
                } else {
                    const validColumns = Object.keys(receivedData[0]);
                    if (!validColumns.includes(columnName)) {
                        console.error("Invalid column selected");
                    } else {
                        const parsedData = receivedData.map(obj => parseFloat(obj[columnName]));
                        setData(parsedData);
                    } 
                }
            }
        });
    }

    const categoryInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const fileInput = (
        <div className="fileInput">
            <h2 style={{textAlign: "center"}}>Input from file</h2>
            <br />
            <input
                type="file"
                name="file"
                accept=".csv"
                ref={fileInputRef}
            />
            <input
                type="text"
                placeholder="Column Name"
                ref={categoryInputRef}
            />
            <button
                onClick={e => {
                    if (categoryInputRef.current.value) {
                        fileUploaded(fileInputRef, categoryInputRef.current.value);
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
        <div className="textDataInput">
            <h2 style={{textAlign: "center"}}>Input from text (values separated by spaces)</h2>
            <br />
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <div>
                    <input 
                        type="text"
                        name="text"
                        ref={textDataInputRef}
                    />
                    <button
                        onClick={e => {
                            if (textDataInputRef.current.value) {
                                const parsedInput = textDataInputRef.current.value.split(" ").map(str => parseFloat(str));
                                if (parsedInput.includes(NaN)) {
                                    console.error("Only integers and floats may be inputted")
                                } else {
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
    
    const headerObj = <h1 style={{textAlign: "center"}}>Single Quantitative Variable</h1>;

    if (!data) {
        return (
            <div className="Inputs">
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
        // normality:
        const standardized = standardize(data);
        const withinOne = numValuesBetween(standardized, -1, 1);
        const withinTwo = numValuesBetween(standardized, -2, 2);
        const withinThree = numValuesBetween(standardized, -3, 3);
        return (
            <div className="Analysis">
                {headerObj}
                <div style={{overflowWrap: "break-word"}}>Data: {JSON.stringify(data)}</div>
                <ul style={{fontSize: "20px"}}>
                    <li>mean: {mean}</li>
                    <li>sample std dev: {stdDev}</li>
                    <li>min: {getMin(data)}</li>
                    <li>q1: {getQ1(data)}</li>
                    <li>med: {getMedian(data)}</li>
                    <li>q3: {getQ3(data)}</li>
                    <li>max: {getMax(data)}</li>
                    <li>n: {n}</li>
                    <li>{withinOne}, or {withinOne / n * 100}% of values are within one s.d.</li>
                    <li>{withinTwo}, or {withinTwo / n * 100}% of values are within two s.d.</li>
                    <li>{withinThree}, or {withinThree / n * 100}% of values are within three s.d.</li>
                </ul>
            </div>
        );
    }
}

export default SingleQuant;
