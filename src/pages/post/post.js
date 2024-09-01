import { useEffect, useLayoutEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../components/hooks/use-server";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostaAsync } from "../../actions/load-post-async";
import { selectPost } from "../../selects";
import styled from "styled-components";
import { RESET_POST_DATA } from "../../actions/reset-post-data";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const isCreating = useMatch("/post");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);
  // const isLoading = useSelector(selectPostLoading);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    dispatch(loadPostaAsync(requestServer, params.id));
  }, [dispatch, requestServer, params.id, isCreating]);

  return (
    <div className={className}>
      {isEditing || isCreating ? (
        <>
          <PostForm post={post} />
        </>
      ) : (
        <>
          <PostContent post={post} />
          <Comments comments={post.comments} postId={post.id} />
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)`
  padding: 0 80px;
  margin: 40px 0;
`;
