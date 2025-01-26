import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const { getUserFromLS, isAuth } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        getUserFromLS();
        const isAuthenticated =   await isAuth();
        if (!isAuthenticated) {
          navigate("/login"); 
        }
      } catch (error) {
        console.error("Authorization error:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [isAuth, navigate, getUserFromLS]);
};
