import React from "react";
import styled from "styled-components";
import { H2, Icon } from "../../../../components";

const PostContentCcontainer = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <div className="special-panel">
        <div>
          <Icon id="fa-calendar" />
          {publishedAt}
        </div>

        <div>
          <Icon id="fa-trash-o" onClick={() => {}} />
          <Icon id="fa-pencil-square-o" onClick={() => {}} />
        </div>
      </div>
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentCcontainer)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .special-panel {
    & div {
      display: flex;
      gap: 10px;
      align-items: center;
      font-size: 18px;
    }
    display: flex;
    margin: -20px 0 20px;
    font-size: 18px;
    justify-content: space-between;

    & .post-text {
      font-size: 18px;
    }
  }
`;
