import { createContext, useEffect, useState, useMemo } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      return await login(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getInitialUserValue() {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.log(error.message);
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      authChecked,
    }),
    [user, login, register, logout, authChecked],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
