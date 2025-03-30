import { Navigate } from 'react-router-dom';

// Component to protect routes that require authentication
function ProtectedRoute({ user, children }) {
  if (!user) {
    // Redirect to login page if not logged in
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;