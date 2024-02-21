import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import '../Styles/Feed.css';

const Feed = () => {
  // State to manage the likes for each feed content
  const [expandedFeeds, setExpandedFeeds] = useState({});
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

  const toggleFeed = (feedId) => {
    setExpandedFeeds((prevState) => ({
      ...prevState,
      [feedId]: !prevState[feedId],
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
      <div className="viewByButton">
        <button type='button'>View Alpabetically</button>
      </div>
      <div className="viewByButton">
        <button type='button'>View By Comment</button>
      </div>
      {/* This will just have to be mapped with feed content */}
      <div className="feedContentContainer">
        <div className="feedContent">
          <button className="toggleButton" onClick={() => toggleFeed('feed1')}>
            {expandedFeeds['feed1'] ? <FaMinus /> : <FaPlus />}
          </button>
          <h3>Placeholder for feed 1</h3>
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
          {expandedFeeds['feed1'] && (
            // What displace for when the feed button is expanded
            <div className="feedDropdown">
              <ul>
                <ol>
                  WHAT WENT RIGHT
                </ol>
                <ol>
                  WHAT WENT WRONG
                </ol>
              </ul>
            </div>
          )}
        </div>
        <div className="feedContent">
          <button className="toggleButton" onClick={() => toggleFeed('feed2')}>
            {expandedFeeds['feed2'] ? <FaMinus /> : <FaPlus />}
          </button>
          <h3>Placeholder for feed 2</h3>
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
          {expandedFeeds['feed2'] && (
            <div className="feedDropdown">
              <ul>
                <ol>
                  WHAT WENT RIGHT
                </ol>
                <ol>
                  WHAT WENT WRONG
                </ol>
              </ul>
            </div>
          )}
        </div>
        <div className="feedContent">
          <button className="toggleButton" onClick={() => toggleFeed('feed3')}>
            {expandedFeeds['feed3'] ? <FaMinus /> : <FaPlus />}
          </button>
          <h3>Placeholder for feed 3</h3>
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
          {expandedFeeds['feed3'] && (
            <div className="feedDropdown">
              <ul>
                <ol>
                  WHAT WENT RIGHT
                </ol>
                <ol>
                  WHAT WENT WRONG
                </ol>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
