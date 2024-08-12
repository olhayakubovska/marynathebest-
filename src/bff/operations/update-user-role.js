import { setUserRole } from "../api/set-user-role";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const updateUserRole = async (hash, userId, newRoleUser) => {
  const accessRoles = [ROLE.ADMIN];
  
  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }

  setUserRole(userId, newRoleUser);

  return {
    error: null,
    res: true,
  };
};
