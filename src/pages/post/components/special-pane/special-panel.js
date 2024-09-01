import styled from "styled-components";
import { Icon } from "../../../../components";
import { useDispatch } from "react-redux";
import { onOpenModal } from "../../../../actions/on-open-modal";
import { CLOSE_MODAL } from "../../../../actions/action-close-modal";
import { useServerRequest } from "../../../../components/hooks/use-server";
import { removePostAsync } from "../../../../actions/remove-post-async";
import { useNavigate } from "react-router-dom";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();
  const onPostRemove = (id) => {
    dispatch(
      onOpenModal({
        text: "Удалить статью?",
        onConfirm: () => {
          dispatch(removePostAsync(requestServer, id)).then(() => {
            navigate("/");
          });
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  return (
    <div className={className}>
      <div className="special-panel">
        <div className="published-at">
          {publishedAt && (
            <Icon
              inActive={true}
              id="fa-calendar"
              margin="0 7px 0 0"
              size="18px"
            />
          )}
          {publishedAt}
        </div>

        <div className="buttons">
          {publishedAt && (
            <Icon
              id="fa-trash-o"
              margin="0 0 0 7px"
              size="18px"
              onClick={() => onPostRemove(id)}
            />
          )}
          {editButton}
        </div>
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
