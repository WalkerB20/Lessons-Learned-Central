import React, { useState } from 'react';
// import { FaMinus, FaPlus } from 'react-icons/fa';
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";
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
        <h1>LLC FEED</h1>

        <div className="feedHeader-buttons">

        <select className="sortBy">
          <option value="null">Sort By</option>
          <option value="popular">Popular</option>
          <option value="recent">Recent</option>
        </select>

        <select className="sortBy">
          <option value="null">View By</option>
          <option value="popular">Title</option>
          <option value="recent">Comment</option>
        </select>

        </div>

      </div>



      {/* This will just have to be mapped with feed content */}
      <div className="feedContentContainer">

        <div className="feedContent">
          <div className="feedContent-title-bubble">
            <button onClick={() => toggleFeed('feed1')}>
              <IconContext.Provider value={{className: "toggleButton"}}>
                {expandedFeeds['feed1'] ? < AiFillCaretDown/> : <AiFillCaretRight />}
              </IconContext.Provider>
            </button>
            <div className="feedContent-title-line">
            <h3 className="title">Rerum, dolores magni, modi ullam iusto, hic praesentium a possimus.</h3>
              <p className="date">01/01/2024</p>
              </div>

            <div className="buttonGroup">
              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <TiDeleteOutline />
                </IconContext.Provider>
              </button>

              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <FiEdit />
                </IconContext.Provider>
              </button>
            </div>

            <div className="feedContent-title-bubble-end">
              <button onClick={() => handleLike('feed1')}>
                <IconContext.Provider value={{className: "like"}}>
                  {likes.feed3 ? <AiFillLike /> : <AiOutlineLike />}
                </IconContext.Provider>
                {likes.feed1 || 0}
              </button>

              </div>

          </div>

          {expandedFeeds['feed1'] && (
            <div className="feedDropdown">
              <ul className="feedDropDown-comment">
                <ol>
                  SUSTAIN: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque rerum pariatur eveniet quibusdam veritatis explicabo!
                </ol>
                <ol>
                  IMPROVE: Voluptates assumenda est aut minus inventore facere iste quibusdam debitis, cupiditate obcaecati voluptatem ducimus repellendus illo non, eos sunt velit molestiae excepturi?
                </ol>
              </ul>
            </div>
          )}
        </div>

        <div className="feedContent">
          <div className="feedContent-title-bubble">
            <button onClick={() => toggleFeed('feed2')}>
              <IconContext.Provider value={{className: "toggleButton"}}>
                {expandedFeeds['feed2'] ? < AiFillCaretDown/> : <AiFillCaretRight />}
              </IconContext.Provider>
            </button>
            <div className="feedContent-title-line">
            <h3 className="title">Rerum, dolores magni, modi ullam iusto, hic praesentium a possimus.</h3>
              <p className="date">01/01/2024</p>
              </div>

            <div className="buttonGroup">
              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <TiDeleteOutline />
                </IconContext.Provider>
              </button>

              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <FiEdit />
                </IconContext.Provider>
              </button>
            </div>

            <div className="feedContent-title-bubble-end">
              <button onClick={() => handleLike('feed2')}>
                <IconContext.Provider value={{className: "like"}}>
                  {likes.feed2 ? <AiFillLike /> : <AiOutlineLike />}
                </IconContext.Provider>
                {likes.feed2 || 0}
              </button>

              </div>

          </div>

          {expandedFeeds['feed2'] && (
            <div className="feedDropdown">
              <ul className="feedDropDown-comment">
                <ol>
                  SUSTAIN: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque rerum pariatur eveniet quibusdam veritatis explicabo!
                </ol>
                <ol>
                  IMPROVE: Voluptates assumenda est aut minus inventore facere iste quibusdam debitis, cupiditate obcaecati voluptatem ducimus repellendus illo non, eos sunt velit molestiae excepturi?
                </ol>
              </ul>
            </div>
          )}
        </div>

        <div className="feedContent">
          <div className="feedContent-title-bubble">
            <button onClick={() => toggleFeed('feed3')}>
              <IconContext.Provider value={{className: "toggleButton"}}>
                {expandedFeeds['feed3'] ? < AiFillCaretDown/> : <AiFillCaretRight />}
              </IconContext.Provider>
            </button>
            <div className="feedContent-title-line">
            <h3 className="title">Rerum, dolores magni, modi ullam iusto, hic praesentium a possimus.</h3>
              <p className="date">01/01/2024</p>
              </div>

            <div className="buttonGroup">
              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <TiDeleteOutline />
                </IconContext.Provider>
              </button>

              <button type="button">
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <FiEdit />
                </IconContext.Provider>
              </button>
            </div>

            <div className="feedContent-title-bubble-end">
              <button onClick={() => handleLike('feed3')}>
                <IconContext.Provider value={{className: "like"}}>
                  {likes.feed3 ? <AiFillLike /> : <AiOutlineLike />}
                </IconContext.Provider>
                {likes.feed3 || 0}
              </button>

              </div>

          </div>

          {expandedFeeds['feed3'] && (
            <div className="feedDropdown">
              <ul className="feedDropDown-comment">
                <ol>
                  SUSTAIN: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque rerum pariatur eveniet quibusdam veritatis explicabo!
                </ol>
                <ol>
                  IMPROVE: Voluptates assumenda est aut minus inventore facere iste quibusdam debitis, cupiditate obcaecati voluptatem ducimus repellendus illo non, eos sunt velit molestiae excepturi?
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
