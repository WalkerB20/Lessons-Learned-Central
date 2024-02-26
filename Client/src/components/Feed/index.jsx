import React, { useState, useEffect } from 'react';
// import { FaMinus, FaPlus } from 'react-icons/fa';
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";
import '../Styles/Feed.css';

const Feed = () => {
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [aarData, setAarData] = useState([]);
  const [editedValues] = useState({
    eventTitle: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    sustainTitle: '',
    commentsSustain: '',
    recommendationsSustain: '',
    improveTitle: '',
    commentsImprove: '',
    recommendationsImprove: '',
    additionalOptions: '',
    additionalInput: '',
  });
  const getroutes = 'http://localhost:3001/api';
  const deleteroutes = 'http://localhost:3001/api';
  const patchroutes = 'http://localhost:3001/api';
  const postroutes = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchAarData = async () => {
      try {
        const response = await fetch(`${getroutes}/postdata`);
        if (!response.ok) {
          throw new Error('Failed to fetch AAR data');
        }
        const responseData = await response.json();
        setAarData(responseData.aarData);
      } catch (error) {
        console.error('Failed to fetch AAR data:', error);
      }
    };
    fetchAarData();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${postroutes}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          console.log("You've already liked this post.");
        } else {
          throw new Error('Failed to like the post');
        }
      } else {
        console.log('Post liked successfully.');
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const toggleFeed = (aarId) => {
    setExpandedFeeds((prevState) => ({
      ...prevState,
      [aarId]: !prevState[aarId],
    }));
  };

  const handleDelete = async (aarId) => {
    try {
      await fetch(`${deleteroutes}/postdelete/${aarId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete item with ID ${aarId}. Status: ${response.status}`);
        }
        setAarData(aarData.filter(item => item.AAR_ID !== aarId));
      });
    } catch (error) {
      console.error('Error deleting feed item:', error);
    }
  };

  const handleEdit = async (aarId) => {
    try {
      const feedToEdit = { ...editedValues };
      const response = await fetch(`${patchroutes}/postpatch/${aarId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedToEdit),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit item with ID ${aarId}. Status: ${response.status}`);
      }

      const updatedItem = await response.json();
      setAarData(aarData.map(item => item.AAR_ID === aarId ? { ...item, ...updatedItem } : item));

    } catch (error) {
      console.error('Error editing feed item:', error);
    }
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
      {aarData.map((aar, index) => ( //added to map the data from the server for dynamic updates
        <div className="feedContent" key={index}>{/*added the index key*/}
          <div className="feedContent-title-bubble">
            <button className="toggleButton" onClick={() => toggleFeed(aar.AAR_ID)}>{/*added the index to get the data*/}

              <IconContext.Provider value={{className:"toggleButton"}}>
                {expandedFeeds[aar.AAR_ID] ?
                < AiFillCaretDown/> : <AiFillCaretRight />}
              </IconContext.Provider>{/*samesies*/}

            </button>
            <div className="feedContent-title-line">
              <h3 className="title">
                {aar.AAR_Name}
              </h3>{/*hopefully this takes the naming convention of the submission*/}
            </div>
            <div className="buttonGroup">

              {/* <button onClick={() => handleLike(aar.AAR_ID)}>
                <IconContext.Provider value={{className: "like"}}>
                    {likes.feed1 ?
                    <AiFillLike /> : <AiOutlineLike />}
                </IconContext.Provider>
                ({likes[aar.AAR_ID]})
              </button> changed likes */}

              <button onClick={() => handleEdit(aar.AAR_ID)}>
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <FiEdit />
                </IconContext.Provider>
              </button>{/*changed edit*/}

              <button onClick={() => handleDelete(aar.AAR_ID)}>
                <IconContext.Provider value={{className: "buttonGroup"}}>
                  <TiDeleteOutline />
                </IconContext.Provider>
              </button>{/*changed delete*/}

              <p className="date">
                {aar.AAR_Activity_Date}
              </p>{/*this should be the date of the submission*/}

          </div>
        </div>

        {expandedFeeds[aar.AAR_ID] && (
              <div className="feedDropdown">
              <ul className="feedDropDown-comment">
                  <li>Comments for Sustain: {aar.sustainCommentData}</li>
                  <li>Comments for Improve: {aar.improveCommentData}</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feed;