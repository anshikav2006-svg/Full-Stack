import React, { useState } from "react";
import "./PostComposer.css";

const platformLimits = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

function PostComposer() {
  const [post, setPost] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const handleCheckbox = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(
        selectedPlatforms.filter((item) => item !== platform)
      );
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="container">

      <h2>Select Platforms</h2>

      <div className="checkboxes">
        {Object.keys(platformLimits).map((platform) => (
          <label key={platform}>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform)}
              onChange={() => handleCheckbox(platform)}
            />
            {platform}
          </label>
        ))}
      </div>

      <textarea
        rows="8"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <h2>Validation</h2>

      {selectedPlatforms.length === 0 ? (
        <p>Please select at least one platform.</p>
      ) : (
        selectedPlatforms.map((platform) => {
          const limit = platformLimits[platform];
          const count = post.length;
          const remaining = limit - count;

          return (
            <div className="card" key={platform}>
              <h3>{platform}</h3>

              <p>
                Character Count: {count}/{limit}
              </p>

              {remaining >= 0 ? (
                <p className="green">
                  Remaining Characters: {remaining}
                </p>
              ) : (
                <p className="red">
                  Character limit exceeded by {-remaining}
                </p>
              )}
            </div>
          );
        })
      )}

    </div>
  );
}

export default PostComposer;