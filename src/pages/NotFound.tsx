import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-lg border border-base-300 max-w-md w-full">
        <div className="card-body items-center text-center">
          <h1 className="text-6xl font-bold text-base-content">404</h1>
          <p className="text-base-content/70 text-lg">Cette page n’existe pas.</p>
          <a href="/" className="btn btn-primary mt-4">
            Retour à l’accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
