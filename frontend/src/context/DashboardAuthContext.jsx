import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../utils/api";

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

function persistLegacyUsers(users) {
  try {
    window.localStorage.setItem(DASHBOARD_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving legacy dashboard users:", error);
  }
}

async function fetchDashboardAuthStatus() {
  const response = await fetch(apiUrl("/api/dashboard-auth/status"));
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not read dashboard auth status.");
  }

  return data;
}

async function registerDashboardUser(payload) {
  const response = await fetch(apiUrl("/api/dashboard-auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not create dashboard account.");
  }

  return data.data;
}

async function loginDashboardUser(payload) {
  const response = await fetch(apiUrl("/api/dashboard-auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not login to dashboard.");
  }

  return data.data;
}

export function DashboardAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [hasRegisteredUsers, setHasRegisteredUsers] = useState(false);

  const persistSession = (user) => {
    setCurrentUser(user);

    if (user) {
      window.localStorage.setItem(
        DASHBOARD_SESSION_KEY,
        JSON.stringify({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        })
      );
    } else {
      window.localStorage.removeItem(DASHBOARD_SESSION_KEY);
    }
  };

  useEffect(() => {
    const bootstrapAuth = async () => {
      const storedUsers = readStoredUsers();
      const storedSession = readStoredSession();

      if (storedSession?.email) {
        setCurrentUser(storedSession);
      }

      try {
        for (const localUser of storedUsers) {
          if (!localUser?.email || !localUser?.password || !localUser?.fullName) {
            continue;
          }

          try {
            await registerDashboardUser({
              fullName: localUser.fullName,
              email: localUser.email,
              password: localUser.password,
            });
          } catch (error) {
            if (!String(error.message || "").includes("already registered")) {
              console.error("Error syncing local dashboard user:", error);
            }
          }
        }

        const status = await fetchDashboardAuthStatus();
        setHasRegisteredUsers(Boolean(status.hasUsers));
      } catch (error) {
        console.error("Error loading dashboard auth status:", error);
        setHasRegisteredUsers(storedUsers.length > 0);
      } finally {
        setReady(true);
      }
    };

    bootstrapAuth();
  }, []);

  const register = async ({ fullName, email, password }) => {
    const user = await registerDashboardUser({
      fullName,
      email,
      password,
    });

    const storedUsers = readStoredUsers();
    const nextUsers = [
      ...storedUsers.filter(
        (storedUser) => storedUser?.email?.toLowerCase() !== user.email?.toLowerCase()
      ),
      {
        fullName,
        email: user.email,
        password,
      },
    ];

    persistLegacyUsers(nextUsers);
    setHasRegisteredUsers(true);
    persistSession(user);

    return user;
  };

  const login = async ({ email, password }) => {
    const user = await loginDashboardUser({
      email,
      password,
    });

    setHasRegisteredUsers(true);
    persistSession(user);

    return user;
  };

  const logout = () => {
    persistSession(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      ready,
      isAuthenticated: Boolean(currentUser),
      hasRegisteredUsers,
      register,
      login,
      logout,
    }),
    [currentUser, ready, hasRegisteredUsers]
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
  const { ready, isAuthenticated } = useDashboardAuth();

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
        to="/dashboard/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
