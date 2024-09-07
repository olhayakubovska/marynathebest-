import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useServerRequest } from "../../components/hooks/use-server";
import { PostCard } from "./components/post-card/post-card";
import { Pagination } from "./components/pagination/pagination";
import { PAGINATION_LIMIT } from "../../constants";
import { getLastPageFromLinks } from "./utils";
import { Search } from "./search/search";
import { debounce } from "./utils/debounce";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldPhrase, setShouldPhrase] = useState(false);

  const requestServer = useServerRequest();

  const startDelaySearch = useMemo(() => debounce(setShouldPhrase, 2000), []);

  useEffect(() => {
    requestServer("fetchPosts", searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { posts, links } }) => {
        setPosts(posts);
        setLastPage(getLastPageFromLinks(links));
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestServer, page, shouldPhrase]);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelaySearch(!shouldPhrase);
  };

  return (
    <div className={className}>
      <div className="posts-and-search">
        <Search onChange={onSearch} searchPhrase={searchPhrase} />

        {posts.length > 0 ? (
          <div className="post-list">
            {posts.map(
              ({ id, imageUrl, title, publishedAt, commentsCount }) => (
                <PostCard
                  key={id}
                  id={id}
                  imageUrl={imageUrl}
                  title={title}
                  publishedAt={publishedAt}
                  commentsCount={commentsCount}
                />
              )
            )}
          </div>
        ) : (
          <div>Статьи не найдено</div>
        )}
      </div>
    {lastPage > 1 && posts.length > 0 && (
  <Pagination page={page} lastPage={lastPage} setPage={setPage} />
)}
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 80px;
  }
`;

// {lastPage > 1 && (
//   <Pagination page={page} lastPage={lastPage} setPage={setPage} />
// )}
