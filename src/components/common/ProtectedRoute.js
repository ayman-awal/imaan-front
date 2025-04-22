import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
}
