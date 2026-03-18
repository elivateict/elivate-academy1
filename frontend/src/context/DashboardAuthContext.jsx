import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DASHBOARD_USERS_KEY = "elivate_dashboard_users";
const DASHBOARD_SESSION_KEY = "elivate_dashboard_session";

const DashboardAuthContext = createContext(null);

function readStoredUsers() {
  try {
    const rawValue = window.localStorage.getItem(DASHBOARD_USERS_KEY);
    const users = rawValue ? JSON.parse(rawValue) : [];
    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Error reading stored dashboard users:", error);
    return [];
  }
}

function readStoredSession() {
  try {
    const rawValue = window.localStorage.getItem(DASHBOARD_SESSION_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    console.error("Error reading stored dashboard session:", error);
    return null;
  }
}

export function DashboardAuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUsers = readStoredUsers();
    const storedSession = readStoredSession();

    setUsers(storedUsers);

    if (storedSession?.email) {
      const matchedUser = storedUsers.find(
        (user) => user.email === storedSession.email
      );

      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
    }

    setReady(true);
  }, []);

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    window.localStorage.setItem(DASHBOARD_USERS_KEY, JSON.stringify(nextUsers));
  };

  const persistSession = (user) => {
    setCurrentUser(user);

    if (user) {
      window.localStorage.setItem(
        DASHBOARD_SESSION_KEY,
        JSON.stringify({
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
        })
      );
    } else {
      window.localStorage.removeItem(DASHBOARD_SESSION_KEY);
    }
  };

  const register = ({ fullName, email, password }) => {
    const trimmedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      throw new Error("Full name, email, and password are required.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const emailExists = users.some((user) => user.email === normalizedEmail);

    if (emailExists) {
      throw new Error("This dashboard email is already registered.");
    }

    const newUser = {
      id:
        window.crypto?.randomUUID?.() ||
        `dashboard-user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      fullName: trimmedName,
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    persistUsers(nextUsers);
    persistSession(newUser);

    return newUser;
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === password
    );

    if (!matchedUser) {
      throw new Error("Invalid email or password.");
    }

    persistSession(matchedUser);
    return matchedUser;
  };

  const logout = () => {
    persistSession(null);
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      ready,
      isAuthenticated: Boolean(currentUser),
      hasRegisteredUsers: users.length > 0,
      register,
      login,
      logout,
    }),
    [users, currentUser, ready]
  );

  return (
    <DashboardAuthContext.Provider value={value}>
      {children}
    </DashboardAuthContext.Provider>
  );
}

export function useDashboardAuth() {
  const context = useContext(DashboardAuthContext);

  if (!context) {
    throw new Error("useDashboardAuth must be used inside DashboardAuthProvider");
  }

  return context;
}

export function DashboardProtectedRoute() {
  const location = useLocation();
  const { ready, isAuthenticated, hasRegisteredUsers } = useDashboardAuth();

  if (!ready) {
    return (
      <div className="dashboard-auth min-h-screen">
        <div className="dashboard-auth__backdrop" />
        <div className="flex min-h-screen items-center justify-center px-6 text-center text-[#144a58]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={hasRegisteredUsers ? "/dashboard/login" : "/dashboard/register"}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
