import styled from "styled-components";
import { Icon } from "../../../../components";

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
  return (
    <div className={className}>
      <div className="special-panel">
        <div className="published-at">
          <Icon id="fa-calendar" margin="0 10px 0 0" size="18px" />
          {publishedAt}
        </div>

        <div className="buttons">{editButton}</div>
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  margin: ${({ margin }) => margin};

  & .published-at {
    display: flex;
    font-size: 18px;
  }

  & .buttons {
    display: flex;
    // font-size: ${({ size }) => size};
  }

  & .special-panel {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 18px;
    justify-content: space-between;
  }
`;
