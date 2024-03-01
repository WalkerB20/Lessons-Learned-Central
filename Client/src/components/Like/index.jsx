import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useAuth0 } from '@auth0/auth0-react';

const likeroutes = 'http://localhost:3001/api';

const Like = ({ commentId, commentType, likeCount: initialLikeCount = 0, liked: initialLiked = false }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const handleLike = () => {
    const token = getAccessTokenSilently();
    const method = liked ? 'DELETE' : 'POST';

    fetch(`${likeroutes}/${commentType}/${commentId}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
  }})
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
      <button onClick={handleLike}>
        {liked ? <AiFillLike /> : <AiOutlineLike />}
        <span>{likeCount}</span>
      </button>
    </div>
  );
};

export default Like;
