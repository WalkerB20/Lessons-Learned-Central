import React, { useState } from 'react';
import '../Styles/Feed.css';

const Feed = () => {
  // State to manage the likes for each feed content
  const [likes, setLikes] = useState({
    feed1: 0,
    feed2: 0,
    feed3: 0
  });

  const handleLike = (feedName) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [feedName]: prevLikes[feedName] + 1
    }));
  };

  return (
    <div className="feed">
      <div className="feedHeader">
        <h1>FEEDS</h1>
        <select className="sortBy">
          <option value="null">Sort By</option>
          <option value="popular">Popular</option>
          <option value="recent">Recent</option>
        </select>
      </div>
      {/* This will just have to be mapped with feed content */}
      <div className="feedContentContainer">
        <div className="feedContent">
          <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt sit.</h3>
          <div className="buttonGroup">
            <button className="deleteButton" type="button">
              Delete
            </button>
            <button className="editButton" type="button">
              Edit
            </button>
            <p className="date">01/01/2024</p>
            <button onClick={() => handleLike('feed1')}>Like ({likes.feed1})</button>
          </div>
        </div>
        <div className="feedContent">
          <h3>Dolorem ipsam autem recusandae distinctio sapiente soluta voluptates vitae nostrum.</h3>
          <div className="buttonGroup">
            <button className="deleteButton" type="button">
              Delete
            </button>
            <button className="editButton" type="button">
              Edit
            </button>
            <p className="date">01/01/2024</p>
            <button onClick={() => handleLike('feed2')}>Like ({likes.feed2})</button>
          </div>
        </div>
        <div className="feedContent">
          <h3>Rerum, dolores magni, modi ullam iusto, hic praesentium a possimus.</h3>
          <div className="buttonGroup">
            <button className="deleteButton" type="button">
              Delete
            </button>
            <button className="editButton" type="button">
              Edit
            </button>
            <p className="date">01/01/2024</p>
            <button onClick={() => handleLike('feed3')}>Like ({likes.feed3})</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
