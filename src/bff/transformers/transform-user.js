export const transformUser = (dbUser) => ({
  id: dbUser.id,
  login: dbUser.login,
  password: dbUser.password,
  registeredAt: dbUser.redisted_at,
  roleId: dbUser.role_id,
});
