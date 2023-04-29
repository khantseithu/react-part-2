import usePosts from "../hooks/usePosts";
import { useState } from "react";

const PostList = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { data: posts, error, isLoading } = usePosts({ page, pageSize });
  if (error) return <p>{error.message}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-primary mt-3 me-2"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary mt-3"
      >
        Next
      </button>
    </>
  );
};

export default PostList;
