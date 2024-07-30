import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Button } from "../../../button/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../../../selects";
import { ROLE } from "../../../../constants";
import { logout } from "../../../../actions/logout";

const RightAlied = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledBackIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogoutIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  return (
    <div className={className}>
      <RightAlied>
        {roleId === ROLE.GUEST ? (
          <Button>
            {" "}
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <StyledLogoutIcon>
              {" "}
              <Icon
                id="fa-sign-out"
                margin="0px 0 0 10px"
                size="24px"
                onClick={() => dispatch(logout(session))}
              />
            </StyledLogoutIcon>
          </>
        )}
      </RightAlied>
      <RightAlied>
        <StyledBackIcon onClick={() => navigate(-1)}>
          <Icon id="fa-caret-left" margin="10px 0 0 0" size="24px" />
        </StyledBackIcon>

        <Link to="/post">
          <Icon id="fa-file-text-o" margin="10px 0 0 16px" size="24px" />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" margin="10px 0 0 16px" size="24px" />
        </Link>
      </RightAlied>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
