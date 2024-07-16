import { addUser } from "./add-user";
import { createSession } from "./create-session";
import { getUser } from "./get-user";

export const server = {
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
      res: createSession(user.role_id),
    };
  },

  async registration(regLogin, regPassord) {
    const user = await getUser(regLogin);

    if (user) {
      return { error: "Такой логин уже занят ", res: null };
    }

    await addUser(regLogin, regPassord);

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};
