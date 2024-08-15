import React from "react";
import styled from "styled-components";
import { Icon } from "../../../../../../components";
import { useServerRequest } from "../../../../../../components/hooks/use-server";
import { useDispatch } from "react-redux";
import { removeCommentAsync } from "../../../../../../actions/remove-comment-async";
import { onOpenModal } from "../../../../../../actions/on-open-modal";
import { CLOSE_MODAL } from "../../../../../../actions/action-close-modal";

const CommentContainer = ({
  className,
  publishedAt,
  content,
  author,
  id,
  postId,
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onRemoveComment = (id) => {
    dispatch(
      onOpenModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id));
          dispatch(CLOSE_MODAL);
        },

        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };


  
  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon id="fa-user-circle-o" size="24px" />
            {author}
          </div>
          <div className="published-at">
            <Icon id="fa-calendar" size="24px" />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon id="fa-trash-o" size="24px" onClick={() => onRemoveComment(id)} />
    </div>
  );
};

export const Comment = styled(CommentContainer)`

display:flex;
align-items: baseline;

& .comment{
border: 1px solid black;
margin:5px;
}

& .information-panel {
display: flex;
justify-content: space-between;
margin: 8px;
}      

& .author {
display: flex;
font-size:18px;
gap:5px;

}

& .published-at {
display: flex;
 align-items: center;
gap: 5px;
}


& .comment-text{
margin: 5px 9px;
font-size:18px;
width: 560px;
}}

}
`;
