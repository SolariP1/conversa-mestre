import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
};

type StoredUser = AuthUser & {
  passwordHash: string;
  createdAt: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const USERS_KEY = "conversa_mestre_users";
const CURRENT_USER_KEY = "conversa_mestre_current_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const hashPassword = (password: string) => {
  return Array.from(password)
    .map((character, index) => (character.charCodeAt(0) * (index + 1)).toString(16))
    .join("");
};

const readUsers = (): StoredUser[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(USERS_KEY);
  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as StoredUser[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error("Erro ao ler usuários armazenados", error);
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedCurrentUser = window.localStorage.getItem(CURRENT_USER_KEY);
    if (storedCurrentUser) {
      try {
        const parsed = JSON.parse(storedCurrentUser) as AuthUser;
        setUser(parsed);
      } catch (error) {
        console.error("Erro ao restaurar sessão do usuário", error);
        window.localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const normalisedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const passwordHash = hashPassword(password);
    const foundUser = users.find((item) => item.email === normalisedEmail && item.passwordHash === passwordHash);

    await new Promise((resolve) => setTimeout(resolve, 450));

    if (!foundUser) {
      throw new Error("Credenciais inválidas. Verifique email e senha.");
    }

    const authUser: AuthUser = { name: foundUser.name, email: foundUser.email };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    }
    setUser(authUser);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const normalisedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName) {
      throw new Error("Informe um nome válido.");
    }

    if (password.trim().length < 6) {
      throw new Error("A senha deve possuir pelo menos 6 caracteres.");
    }

    const users = readUsers();
    const existingUser = users.find((item) => item.email === normalisedEmail);
    if (existingUser) {
      throw new Error("Este email já está cadastrado.");
    }

    const newUser: StoredUser = {
      name: trimmedName,
      email: normalisedEmail,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    const authUser: AuthUser = { name: trimmedName, email: normalisedEmail };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
    }

    await new Promise((resolve) => setTimeout(resolve, 450));

    setUser(authUser);
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoading, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
export type { AuthUser };
