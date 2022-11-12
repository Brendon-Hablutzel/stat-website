import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ padding: "10px", fontSize: "20px" }}>
            <h1>Home</h1>
            <Link to={'/single-quant'}>One Quantitative Variable</Link>
            <br />
            <Link to={'/double-quant'}>Two Quantitative Variables</Link>
        </div>
    );
}