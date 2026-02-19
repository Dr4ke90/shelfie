import {
  Client,
  Account,
  Databases,
  Avatars,
  Storage,
} from "react-native-appwrite";

// Configurația ta
export const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  platform: "dev.sirweb.shelfie", //
  projectId: "699478a50029200125bd",
  databaseId: "6995c424003dddd01fdb",
  collectionId: "6996baa4001555181572",
};

// Inițializarea clientului
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// Instanțierea serviciilor
export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);

export { client };
