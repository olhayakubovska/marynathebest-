import React, { useState } from "react";
import styled from "styled-components";
import { Comment } from "./commponents";
import { Icon } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../../selects";
import { useServerRequest } from "../../../../components/hooks/use-server";
import { addCommentAsync } from "../../../../actions/add-comment-async";

const CommentsContainer = ({ className,  comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  const onNewCommentAdd = (postId, userId, content) => {
    dispatch(addCommentAsync(requestServer, postId, userId, content));
  };

  return (
    <div className={className}>
      <div className="new-comment">
        <textarea
          name="comment"
          value={newComment}
          placeholder="Коментарий..."
          onChange={({ target }) => setNewComment(target.value)}
        ></textarea>
        <Icon
          id="fa-paper-plane-o"
          margin="0 0 0 10px"
          size="24px"
          onClick={() => onNewCommentAdd(postId, userId, newComment)}
        />
      </div>
      <div className="comments">
        {comments.map(({ publishedAt, content, author, id }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    
    
    & .new-comment textarea {
      width: 580px;
    height: 120px;
    margin: 20px 0 0;
    resize: none;
          font-size: 18px;
а
  }

  & .new-comment {
    display: flex;
  }
`;
