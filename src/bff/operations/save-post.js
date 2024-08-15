import { updatePost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const savePost = async (hash, newPostData) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }

  const updatePostData = await updatePost(newPostData);
  //   const abc = await updatePost(newPostData);
  //   const abcd = await abc.json();

  console.log("abcdа", updatePostData);
  return {
    error: null,
    res: updatePostData,
  };
};
