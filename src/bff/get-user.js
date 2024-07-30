export const getUser = async (loginToFind) => 
  fetch(`http://localhost:3005/users?login=${loginToFind}`)
    .then((response) => response.json())
    .then(([data]) => data);

