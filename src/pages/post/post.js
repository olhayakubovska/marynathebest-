import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useServerRequest } from "../../components/hooks/use-server";
import { loadPostaAsync } from "../../actions/load-post-async";
import { selectPost } from "../../selects";
import { PostContent } from "./components/post-content.js/post-content";
import { Comments } from "./components/comments/comments";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  // console.log(post);

  useEffect(() => {
    dispatch(loadPostaAsync(requestServer, params.id));
  }, [dispatch, requestServer, params.id]);

  return (
    <div className={className}>
      <PostContent post={post} />
      <Comments comments={post.comments} postId={post.id} />
    </div>
  );
};

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`;
