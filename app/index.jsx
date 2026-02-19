import "react-native-url-polyfill/auto";
import { StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

import Logo from "../assets/images/Logo1.jpg";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <Image source={Logo} style={styles.image} />

      <ThemedText title={true} style={styles.title}>
        The number 1
      </ThemedText>
      <Spacer height={10} />
      <ThemedText>Readind List APP</ThemedText>
      <Spacer height={50} />

      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>
      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>
      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  link: {
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
