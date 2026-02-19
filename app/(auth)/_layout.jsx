import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUser } from "../../hooks/useUser";
import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {
  const { user } = useUser();

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
