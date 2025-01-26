import axios from "@/lib/axios";
import { type LoginFormData } from "@/modules/auth/components/LoginForm/useLoginForm";
import { type RegistrationFormData } from "@/modules/auth/types/registrationFormData";
import { type Role } from "@/modules/auth/types/role";
import { type User } from "@/modules/auth/types/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  users: User[] | null;
  roles: Role[] | null;
  token: string | null;
  error: string | null;
  setUser: (user: User) => void;
  setToken: (token: AuthState["token"]) => void;
  setTokenToLS: (token: AuthState["token"]) => void;
  setUserToLS: (user: User) => void;
  getUserFromLS: () => void;
  login: (formData: LoginFormData) => Promise<User>;
  logout: () => void;
  registration: (formData: RegistrationFormData) => Promise<void>;
  isAuth: () => Promise<boolean>;
  getUserById: (id: string) => Promise<User | undefined>;
  getRoles: () => Promise<Role[]| undefined> ;
  getUsers: () => Promise<User[] | undefined> ;

}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  users: null,
  roles: null,
  token: localStorage.getItem("token") || null,
  error: null,

  setUser: (user: User) => set({ user }),

  setToken: (token: AuthState["token"]) => set({ token }),

  setTokenToLS: (token: AuthState["token"]) => {
    if (token !== null) {
      set({ token });
      localStorage.setItem("token", token);
    }
  },

  setUserToLS: (user: AuthState["user"]) => {
    if (user !== null) {
      set({ user });
      localStorage.setItem("user", JSON.stringify(user) as string);
    }
  },

  getUserFromLS: () => {
    const user = localStorage.getItem("user");
    if (user !== null) set({ user: JSON.parse(user) as User });
  },

  login: async (formData: LoginFormData) => {
    try {
      const response = await axios.post("/auth/login", formData);
      console.log(response);
      set({
        user: response.data.user,
        token: response.data.token,
        error: null,
      });
      useAuthStore.getState().setTokenToLS(response.data.token);
      useAuthStore.getState().setUserToLS(response.data.user);
      return response.data.user;
    } catch {
      set({ error: "Невдала спроба авторизації. Перевір введені дані." });
    }
  },

  logout: () => set({ user: null, roles: null, token: null, error: null }),

  registration: async (formData: RegistrationFormData) => {
    try {
      const response = await axios.post("/auth/registration", formData);
      set((state) => ({
        users: state.users ? [...state.users, response.data] : [response.data],
      }));
    } catch {
      set({
        error:
          "Невдала спроба реєстрації нового користувача. Перевір введені дані.",
      });
    }
  },

  isAuth: async () => {
    try {
      const user = useAuthStore.getState().user;
      if (user !== null) {
        const response = await axios.get(`/auth/me/${user._id}`);
        set({
          user: response.data.user,
          token: response.data.token,
          error: null,
        });
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Невдала спроба автентифікації.", error);
      set({ error: "Невдала спроба автентифікації." });
      return false; 
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get<User[]>("/auth/users");
      set({ users: response.data });
      return response.data;
    } catch {
      set({ error: "Невдала спроба завантаження користувачів." });
    }
  },

  getRoles: async () => {
    try {
      const response = await axios.get<Role[]>("/auth/roles");
      set({ roles: response.data });
      return response.data;
    } catch {
      set({ error: "Невдала спроба завантаження ролей." });
    }
  },

  getUserById: async (id: string) => {
    try {
        const response = await axios.get(`/auth/users/${id}`);
        return response.data.user;
    } catch  {
        set({ error: 'Невдала спроба завантаження користувача.' });
    }
},


}));
