import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAuth0 } from '@auth0/auth0-react';
import { IconContext } from "react-icons";
import '../Styles/Like.css';
import '../Styles/index.css';
import '../Styles/Feed.css';

const likeroutes = 'http://localhost:3001/api';

const Like = ({ commentId, commentType, likeCount: initialLikeCount = 0, liked: initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const handleLike = async () => {
    const token = await getAccessTokenSilently();
    const method = liked ? 'DELETE' : 'POST';
  
    try {
      const response = await fetch(`${likeroutes}/${commentType}/${commentId}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (method === 'POST') {
        setLiked(true);
        setLikeCount(likeCount + 1);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      setError(error);
    }
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
