import React, { useState } from "react";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { TableRow } from "../table-row/table-row";
import { useServerRequest } from "../../../../components/hooks/use-server";
import PropTypes from "prop-types";
import { PROP_TYPES } from "../../../../constants";

const UserRowContainer = ({
  className,
  id,
  registeredAt,
  login,
  roleId: userRoleId,
  roles,
  removeUser,
}) => {
  const [initialRoleUser, setInitialRoleUser] = useState(userRoleId);
  const [selectRoleId, setSelectRoleId] = useState(userRoleId);

  const requestServer = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectRoleId(Number(target.value));
  };

  const onSaveRole = (userId, newRoleUser) => {
    requestServer("updateUserRole", userId, newRoleUser).then(() => {
      setInitialRoleUser(newRoleUser);
    });
  };

  const isSaveButtonDisabled = selectRoleId === initialRoleUser;
  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registeredAt}</div>

        <div className="role-column">
          <select value={selectRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => (
              <option key={roleId} value={roleId}>
                {roleName}
              </option>
            ))}
          </select>

          <Icon
            id="fa fa-floppy-o"
            margin="0px 0 0 10px"
            size="24px"
            disabled={isSaveButtonDisabled}
            onClick={() => onSaveRole(id, selectRoleId)}
          />
        </div>
      </TableRow>

      <Icon
        id="fa  fa-trash"
        margin="0px 0 0 10px"
        size="24px"
        onClick={removeUser}
      />
    </div>
  );
};

export const UserRow = styled(UserRowContainer)`
  display: flex;
  margin-top: 10px;

  & select {
    font-size: 16px;
    padding: 0 5px;
  }
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  registeredAt: PropTypes.string.isRequired,
  roleId: PROP_TYPES.ROLE_ID.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPES.ROLE).isRequired,

  removeUser: PropTypes.func.isRequired,
};
