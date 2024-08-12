import React from "react";
import styled from "styled-components";
import { Icon } from "../../../../../../components";

const CommentContainer = ({ className, publishedAt, content, author, id }) => {
  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon id="fa-user-circle-o" size="24px" onClick={() => {}} />
            {author}
          </div>
          <div className="published-at">
            <Icon id="fa-calendar" size="24px" onClick={() => {}} />
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      <Icon id="fa-trash-o" size="24px" onClick={() => {}} />
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
    margin: 5px;
}      
};
  & .author {
  display: flex;
}

 & .published-at {
  display: flex;
}

& .comment-text{
    margin: 5px 9px;
    font-size:18px;
    width: 560px;
}}

}
`;
