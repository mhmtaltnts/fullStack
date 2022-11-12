import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Customer";

  if (token) {
    const decoded = jwtDecode(token);
    const { id, email, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return {id, email, roles, status, isManager, isAdmin };
  }

  return { id: "", email: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
