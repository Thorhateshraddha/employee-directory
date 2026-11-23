import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="panel empty-state">
      <h2>Page not found</h2>
      <p>The page you requested does not exist.</p>
      <Link className="button button-primary" to="/">
        Go to dashboard
      </Link>
    </div>
  );
}
