import { useSelector } from "react-redux";
import { Error } from "../error/error";
import { selectUserRole } from "../../selects";
import { ERROR } from "../../constants";
import { checkAccess } from "../../utils/check-access";

export const Content = ({ children, serverError = null, access }) => {
  const userRole = useSelector(selectUserRole);
  console.log(userRole);

  const acessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIDE;
  const error = acessError || serverError;

  return error ? <Error error={error} /> : children;
};
