import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { apiUrl } from "../utils/api";

const DASHBOARD_SESSION_KEY = "elivate_dashboard_session";

const DashboardAuthContext = createContext(null);

function readStoredSession() {
  try {
    const rawValue = window.localStorage.getItem(DASHBOARD_SESSION_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    console.error("Error reading stored dashboard session:", error);
    return null;
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

async function fetchDashboardUsers() {
  const response = await fetch(apiUrl("/api/dashboard-auth/users"));
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not load dashboard users.");
  }

  return data.data || [];
}

async function updateDashboardUserStatus(userId, isSuspended) {
  const response = await fetch(apiUrl(`/api/dashboard-auth/users/${userId}/status`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isSuspended }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not update dashboard user.");
  }

  return data.data;
}

async function deleteDashboardUser(userId) {
  const response = await fetch(apiUrl(`/api/dashboard-auth/users/${userId}`), {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Could not delete dashboard user.");
  }

  return data;
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
          isSuspended: Boolean(user.isSuspended),
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
      const storedSession = readStoredSession();

      if (storedSession?.email) {
        setCurrentUser(storedSession);
      }

      try {
        const status = await fetchDashboardAuthStatus();
        setHasRegisteredUsers(Boolean(status.hasUsers));

        if (storedSession?.id && status.hasUsers) {
          try {
            const users = await fetchDashboardUsers();
            const matchedUser = users.find((user) => user.id === storedSession.id);

            if (!matchedUser || matchedUser.isSuspended) {
              persistSession(null);
            } else {
              persistSession(matchedUser);
            }
          } catch (error) {
            console.error("Error validating stored dashboard session:", error);
          }
        }
      } catch (error) {
        console.error("Error loading dashboard auth status:", error);
        setHasRegisteredUsers(Boolean(storedSession?.email));
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

  const getUsers = async () => fetchDashboardUsers();

  const setUserSuspended = async (userId, isSuspended) => {
    const user = await updateDashboardUserStatus(userId, isSuspended);

    if (currentUser?.id === user.id) {
      if (user.isSuspended) {
        persistSession(null);
      } else {
        persistSession(user);
      }
    }

    return user;
  };

  const removeUser = async (userId) => {
    const isCurrentUser = currentUser?.id === userId;

    await deleteDashboardUser(userId);

    if (isCurrentUser) {
      persistSession(null);
    }

    try {
      const status = await fetchDashboardAuthStatus();
      setHasRegisteredUsers(Boolean(status.hasUsers));
    } catch (error) {
      console.error("Error refreshing dashboard auth status:", error);
    }

    return {
      deletedCurrentUser: isCurrentUser,
    };
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
      getUsers,
      setUserSuspended,
      removeUser,
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
        to="/waji/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
