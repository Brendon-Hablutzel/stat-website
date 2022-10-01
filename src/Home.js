import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="Home">
            <h1>Home</h1>
            <Link to={'/single-quant'}>Single Quantitative Variable</Link>
        </div>
    );
}