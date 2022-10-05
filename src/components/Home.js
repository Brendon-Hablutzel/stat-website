import { Link } from 'react-router-dom';
import './../styles/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <h1>Home</h1>
            <Link to={'/single-quant'}>One Quantitative Variable</Link>
            <br />
            <Link to={'/double-quant'}>Two Quantitative Variables</Link>
        </div>
    );
}