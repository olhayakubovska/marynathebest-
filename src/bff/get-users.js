export const getUsers = () =>
  fetch("http://localhost:3005/users").then((loadedData) => loadedData.json());
