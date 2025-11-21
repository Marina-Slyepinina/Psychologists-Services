import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
type ProtectedRouteProps = {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    navigate("/");
  }

  return children;
};