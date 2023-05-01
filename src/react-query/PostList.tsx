import React from "react";
import usePosts from "../hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });
  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul className="list-group">
        {posts.pages.map((page) => (
          <React.Fragment>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
        {/* {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))} */}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="btn btn-primary mt-3"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
