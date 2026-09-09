import { create } from "zustand";

const AUTH_TOKEN_KEY = "delesun_auth_token";
const AUTH_USER_KEY = "delesun_auth_user";

export interface AuthUser {
  username: string;
  role: "admin";
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  hydrate: () => void;
}

const mockAdminUser: AuthUser = { username: "admin", role: "admin" };
const mockToken = "mock-jwt-token-admin-" + Date.now();

const validCredentials: Record<string, string> = {
  admin: "123456",
};

const isBrowser = (): boolean => typeof window !== "undefined" && typeof localStorage !== "undefined";

const persistAuth = (token: string, user: AuthUser): void => {
  if (!isBrowser()) return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

const clearPersistedAuth = (): void => {
  if (!isBrowser()) return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

const readPersisted = (): { token: string | null; user: AuthUser | null } => {
  if (!isBrowser()) return { token: null, user: null };
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userRaw = localStorage.getItem(AUTH_USER_KEY);
  let user: AuthUser | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw) as AuthUser;
    } catch {
      user = null;
    }
  }
  return { token, user };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (username: string, password: string) => {
    const expected = validCredentials[username];
    if (!expected || expected !== password) {
      return { success: false, message: "用户名或密码错误" };
    }
    const token = mockToken;
    const user = mockAdminUser;
    persistAuth(token, user);
    set({ token, user, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    clearPersistedAuth();
    set({ token: null, user: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (get().isAuthenticated) return;
    const { token, user } = readPersisted();
    if (token && user) {
      set({ token, user, isAuthenticated: true });
    }
  },
}));

if (typeof window !== "undefined") {
  useAuthStore.getState().hydrate();
}
