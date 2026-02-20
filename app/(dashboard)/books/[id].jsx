import { StyleSheet, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedCard from "../../../components/ThemedCard";
import ThemedButton from "../../../components/ThemedButton";

import Spacer from "../../../components/Spacer";
import { useEffect, useState } from "react";
import { useBooksContext } from "../../../hooks/useBooksContext";
import ThemedLoader from "../../../components/ThemedLoader";
import { Colors } from "../../../constants/Colors";

const BookDetails = () => {
  const [book, setBook] = useState(null);

  const { id } = useLocalSearchParams();

  const { fetchBookById, deleteBook } = useBooksContext();

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      setBook(null);
      router.replace("/books");
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    async function loadBook() {
      const bookData = await fetchBookById(id);
      setBook(bookData);
    }

    loadBook();
  }, [id]);

  if (!book) {
    return (
      <ThemedView style={styles.container} safe={true}>
        <ThemedLoader />
      </ThemedView>
    );
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText title={true} style={styles.title}>
          {book.title}
        </ThemedText>
        <ThemedText>Writen by {book.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book Description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>

      <ThemedButton style={styles.deleteButton} onPress={() => handleDelete()}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Delete</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default BookDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  deleteButton: {
    backgroundColor: Colors.warning,
    marginTop: 40,
    width: "200",
    alignSelf: "center",
  },
});
