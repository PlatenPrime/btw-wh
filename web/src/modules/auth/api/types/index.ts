// User type based on API
export interface User {
  _id: string;
  username: string;
  fullname: string;
  role: string;
  telegram?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

// Role type based on API
export interface Role {
  value: string;
  name?: string;
}

// AuthContext type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: UpdateUserData) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

// AuthProvider props
export interface AuthProviderProps {
  children: React.ReactNode;
}

// Register and Update types
export interface RegisterData {
  username: string;
  password: string;
  fullname: string;
  role?: string;
  telegram?: string;
  photo?: string;
}

export interface UpdateUserData {
  fullname?: string;
  password?: string;
  telegram?: string;
  photo?: string;
}
