import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import { useBooksContext } from "../../hooks/useBooksContext";
import { useState } from "react";
import { useRouter } from "expo-router";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedButton from "../../components/ThemedButton";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { createBook } = useBooksContext();
  const route = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return;

    setLoading(true);

    await createBook({ title, author, description });

    // reset fields
    setTitle("");
    setAuthor("");
    setDescription("");

    // redirect to books list
    route.replace("/books");

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <ThemedText title={true} style={styles.heading}>
          Create a new book
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "##fff" }}>
            {loading ? "Creating..." : "Create Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    padding: 20,
    borderRadius: 6,
    minHeight: 50,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
  multiline: {
    padding: 20,
    borderRadius: 6,
    minHeight: 150,
    alignSelf: "stretch",
    marginHorizontal: 40,
  },
});
