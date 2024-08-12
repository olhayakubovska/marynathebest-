import styled from "styled-components";
import { H2 } from "../../components";
import { UserRow } from "./components/user-row/user-row";
import { TableRow } from "./components/table-row/table-row";
import { useServerRequest } from "../../components/hooks/use-server";
import { useEffect, useState } from "react";
import Content from "../../components/content/content";

const UsersContainer = ({ className }) => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const requestServer = useServerRequest();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([userRes, rolesRes]) => {
      if (userRes.error || rolesRes.error) {
        setErrorMessage(userRes.error || rolesRes.error);
        return;
      }

      setRoles(rolesRes.res);
      setUsers(userRes.res);
    });
  }, [requestServer, flag]);

  const removeUser = (userId) => {
    requestServer("removeUser", userId).then(() => {
      setFlag(!flag);
    });
  };

  return (
    <div className={className}>
      <Content error={errorMessage}>
        <H2>Пользователи</H2>
        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регестрации</div>
            <div className="role-column">Роль</div>
          </TableRow>
          {users.map(({ id, registeredAt, login, roleId }) => (
            <UserRow
              key={id}
              id={id}
              registeredAt={registeredAt}
              login={login}
              roleId={roleId}
              roles={roles.filter(({ name }) => name !== "Гость")}
              removeUser={() => removeUser(id)}
            />
          ))}{" "}
        </div>
      </Content>
    </div>
  );
};

export const Users = styled(UsersContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 570px;
  margin: 0 auto;
  font-size: 18px;
`;
