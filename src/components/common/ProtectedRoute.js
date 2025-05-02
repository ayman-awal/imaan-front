import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children, checkAdmin=null }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }

    if (checkAdmin){
      if (!isAdmin){
        router.push("/");
      }
    }

  }, [isLoggedIn, isAdmin, checkAdmin]);

  if (!isLoggedIn || (checkAdmin && !isAdmin)) {
    return null;
  }

  return children;
}
