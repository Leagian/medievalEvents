import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ user, requiredRoles, redirectPath, children }) {
  if (!user) return <Navigate to={redirectPath} replace />;
  if (requiredRoles && !requiredRoles.includes(user.role))
    return <Navigate to={redirectPath} replace />;

  return children || <Outlet />;
}

ProtectedRoute.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  requiredRoles: PropTypes.arrayOf(PropTypes.string),
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ProtectedRoute.defaultProps = {
  user: null,
  requiredRoles: null,
  redirectPath: "/login",
  children: null,
};

export default ProtectedRoute;
