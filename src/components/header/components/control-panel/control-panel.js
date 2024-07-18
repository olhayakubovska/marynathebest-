import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link, useNavigate } from "react-router-dom";

const RightAlied = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  width: 100px;
  height: 32px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

const StyledButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <RightAlied>
        <StyledLink to="/login">Войти</StyledLink>
      </RightAlied>
      <RightAlied>
        <StyledButton onClick={() => navigate(-1)}>
          <Icon id="fa-caret-left" margin="10px 0 0 0" size="24px" />
        </StyledButton>

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
