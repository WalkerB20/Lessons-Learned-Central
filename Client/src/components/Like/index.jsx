import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IconContext } from "react-icons";
import '../Styles/Like.css';
import '../Styles/index.css';
import '../Styles/Feed.css';

const likeroutes = 'http://localhost:3001/api';

const Like = ({ commentId, commentType, likeCount: initialLikeCount = 0, liked: initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState(null);

  const handleLike = () => {
    const method = liked ? 'DELETE' : 'POST';

    fetch(`${likeroutes}/${commentType}/${commentId}`, { method })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLiked(!liked);
        setLikeCount(data.likeCount);
      })
      .catch(error => {
        console.log('Error:', error);
        setError(error);
      });
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <button className="likeButton" onClick={handleLike}>
      <IconContext.Provider value={{className:"like"}}>
        {liked ? <AiFillLike /> : <AiOutlineLike />}
      </IconContext.Provider>
        <span>{likeCount}</span>
      </button>
    </div>
  );
};

export default Like;
