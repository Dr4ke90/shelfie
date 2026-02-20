import { useRouter } from "expo-router";
import { useUserContext } from "../../hooks/useUserContext";
import { useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }) => {
  const { user, authChecked } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  if (!authChecked || user) {
    return <ThemedLoader />;
  }

  return children;
};

export default GuestOnly;
