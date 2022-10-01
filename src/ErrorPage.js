import { Link } from "react-router-dom";

export default function ErrorPage() {

    return (
        <div id="error-page">
            <h1>Error:</h1>
            <p>
                <i>Page Not Found</i>
            </p>
            <Link to={'/'}>Home</Link>
        </div>
    );
}