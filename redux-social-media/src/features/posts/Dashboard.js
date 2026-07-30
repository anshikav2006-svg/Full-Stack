import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  addPost,
} from "./postsSlice";

import {
  selectFacebookPosts,
  selectTotalPosts,
  selectAnalytics,
} from "./selectors";

import PostList from "./PostList";

function Dashboard() {
  const dispatch = useDispatch();

  const posts = useSelector(selectFacebookPosts);
  const total = useSelector(selectTotalPosts);
  const analytics = useSelector(selectAnalytics);
  const loading = useSelector((state) => state.posts.loading);

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Facebook");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  const handleAdd = useCallback(() => {
    if (title.trim() === "") {
      alert("Please enter a post title");
      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title,
        platform,
      })
    );

    setTitle("");
    setPlatform("Facebook");
  }, [dispatch, title, platform]);

  return (
    <div>
      <h1>Social Media Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginRight: "10px",
          }}
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
          }}
        >
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Instagram">Instagram</option>
          <option value="Twitter">Twitter (X)</option>
        </select>

        <button onClick={handleAdd}>Add Post</button>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h2>Total Posts : {total}</h2>

          <h2>Analytics</h2>

          <ul>
            {Object.entries(analytics).map(([key, value]) => (
              <li key={key}>
                {key} : {value}
              </li>
            ))}
          </ul>

          <PostList posts={sortedPosts} />
        </>
      )}
    </div>
  );
}

export default Dashboard;