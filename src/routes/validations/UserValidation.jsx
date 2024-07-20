import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthService } from "../../services/auth";
import { validateToken } from "../../application/actions/GET/validate-token";

export function UserValidation() {
  const { user, setUser } = useAuthService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log({ user });
    async function checkUser() {
      console.log({ user });
      if (user) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const [userData] = await validateToken(token);
      console.log({ userData });
      if (userData) {
        console.log("SETTING USER");
        setUser(userData);
      }
    }

    checkUser().then(() => setIsLoading(false));
  }, [user]);

  if (isLoading) return null; // O muestra un componente de carga

  return <Outlet />;
}
