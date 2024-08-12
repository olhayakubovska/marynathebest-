import { transformUser } from "../transformers";

export const getUsers = () =>
  fetch("http://localhost:3005/users")
    .then((loadedData) => loadedData.json())
    .then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));
