import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserContext } from "../../hooks/useUserContext";
import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {
  const { user } = useUserContext();

  console.log("User in AuthLayout:", user);

  return (
    <GuestOnly>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      />
    </GuestOnly>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
