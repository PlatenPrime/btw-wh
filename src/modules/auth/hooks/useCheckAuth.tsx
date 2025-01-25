import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useCheckAuth = () => {
  const navigate = useNavigate();
  const { getUserFromLS, getMe } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        getUserFromLS();
        await getMe();
      } catch (error) {
        console.error("Authorization error:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [getMe, navigate, getUserFromLS]);
};
