//мы должны проверить имеет ли пользователь права для того чтобы эти роли получить

import { getRoles } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const fetchRoles = async (hash) => {
  //ту хратиться список ролей которые могут запросить роли
  const accessRoles = [ROLE.ADMIN]; // - массив с ролями(мы сами его задаем. тот кому доступна опирация fetchRoles ) для кого на сервере доступен список ролей.

  const access = await sessions.access(hash, accessRoles)

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }

  // если он права имеет то делаем  getRoles() - запрос к базе данных и  получим roles и их отправим
  const roles = await getRoles();
  return {
    error: null,
    res: roles,
  };
};
