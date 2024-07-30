import { sessions } from "./sessions";
import { addUser } from "./add-user";

import { getUser } from "./get-user";

export const server = {
  async logout(session) {
    sessions.remove(session);
  },

  async authorize(authLogin, authPassword) {
    const user = await getUser(authLogin);

    if (!user) {
      return { error: "Такого пользователя нет", res: null };
    }

    if (authPassword !== user.password) {
      return { error: "Неверный пароль", res: null };
    }

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.add(user),
      },
    };
  },

  async registration(regLogin, regPassord) {
    const existedUser = await getUser(regLogin);

    if (existedUser) {
      return { error: "Такой логин уже занят ", res: null };
    }

    const user = await addUser(regLogin, regPassord);

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.add(user),
      },
    };
  },
};
