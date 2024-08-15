import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useServerRequest } from "../../components/hooks/use-server";
import { Comments, PostContent, PostForm } from "./components";
import { loadPostaAsync } from "../../actions/load-post-async";
import { selectPost, selectPostLoading } from "../../selects";
import styled from "styled-components";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);
  const isLoading = useSelector(selectPostLoading);

  useEffect(() => {
    dispatch(loadPostaAsync(requestServer, params.id));
  }, [dispatch, requestServer, params.id]);

  if (isLoading) {
    return <div>Loading...</div>; // Индикатор загрузки, пока данные не загружены
  }

  return (
    <div className={className}>
      {isEditing ? (
        <>
          {" "}
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
