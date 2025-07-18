import { useState, useEffect, useCallback } from "react";

export function useAdminAuth() {
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem("fdmc_admin_logged") === "true";
  });

  const handleLoginSuccess = useCallback(() => {
    setIsLogged(true);
    localStorage.setItem("fdmc_admin_logged", "true");
  }, []);

  const handleLogout = useCallback(() => {
    setIsLogged(false);
    localStorage.removeItem("fdmc_admin_logged");
  }, []);

  useEffect(() => {
    if (!isLogged) {
      localStorage.removeItem("fdmc_admin_logged");
    }
  }, [isLogged]);

  return { isLogged, handleLoginSuccess, handleLogout };
}
