import { createContext, useEffect, useState } from "react";
import { databases, client } from "../lib/appwrite";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "6995c424003dddd01fdb";
const COLLECTION_ID = "6996baa4001555181572";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user.$id)],
      );

      setBooks(response.documents);
    } catch (error) {
      console.error("Eroare la fetchBooks:", error.message);
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function createBook(book) {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          ...book,
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      );

      return newBook;
    } catch (error) {
      console.error("Appwrite Error:", error.message);
      throw new Error(error.message);
    }
  }

  async function deleteBook(id) {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { events, payload } = response;

        if (events.some((e) => e.includes("create"))) {
          setBooks((prevBooks) => [...prevBooks, payload]);
        }

        if (events.some((e) => e.includes("delete"))) {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.$id !== payload.$id),
          );
        }
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, createBook, fetchBookById, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};
