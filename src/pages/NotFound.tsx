import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="min-h-dvh grid place-items-center px-4">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-text-secondary-dark">Page not found.</p>
        <Link
          to="/"
          className="inline-block mt-2 rounded-lg bg-primary text-card-dark font-bold h-11 px-5"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};
