import React from "react";

const PostList = React.memo(({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>
            <b>Platform:</b> {post.platform}
          </p>
        </div>
      ))}
    </div>
  );
});

export default PostList;