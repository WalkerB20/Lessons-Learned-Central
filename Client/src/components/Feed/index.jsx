import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import '../Styles/Feed.css';
const Feed = () => {
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [aarData, setAarData] = useState([]);
  const [editedValues, setEditedValues] = useState({
    eventTitle: '',
    eventLocation: '',
    eventDate: '',
  });
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited
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
      const response = await fetch(`${patchroutes}/postpatch/${aarId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedValues),
      });
      if (!response.ok) {
        throw new Error(`Failed to edit item with ID ${aarId}. Status: ${response.status}`);
      }
      const responseData = await response.json();
      const updatedItemData = responseData.updatedItem;
      console.log('Updated item:', updatedItemData);
      setAarData(prevAarData => prevAarData.map(item => item.AAR_ID === aarId ? { ...item, ...updatedItemData } : item));
      setEditingItemId(null); // Reset editing item ID after editing
    } catch (error) {
      console.error('Error editing feed item:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues(prevState => ({
      ...prevState,
      [name]: value
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
        <button type='button'>View By Title</button> {/*Made changes here, previously alphabetically*/}
        <button type='button'>View By Comment</button>{/*removed extra className, it was redundant*/}
      </div>
      {/* This will just have to be mapped with feed content */}
      <div className="feedContentContainer">
      {aarData.map((aar, index) => ( //added to map the data from the server for dynamic updates
        <div className="feedContent" key={index}>{/*added the index key*/}
          <button className="toggleButton" onClick={() => toggleFeed(aar.AAR_ID)}>{/*added the index to get the data*/}
            {expandedFeeds[aar.AAR_ID] ? <FaMinus /> : <FaPlus />}{/*samesies*/}
          </button>
          <h3>{aar.AAR_Name}</h3>{/*hopefully this takes the naming convention of the submission*/}
          <h2>{aar.AAR_Location}</h2>
          <div className="buttonGroup">
            {editingItemId === aar.AAR_ID ? (
              <>
                <input type="text" name="eventTitle" value={editedValues.eventTitle} onChange={handleChange} />
                <input type="text" name="eventLocation" value={editedValues.eventLocation} onChange={handleChange} />
                <input type="date" name="eventDate" value={editedValues.eventDate} onChange={handleChange} />
                <button onClick={() => handleEdit(aar.AAR_ID)}>Submit</button>
              </>
            ) : (
              <button onClick={() => setEditingItemId(aar.AAR_ID)}>Edit</button>
            )}
            <button onClick={() => handleDelete(aar.AAR_ID)}>Delete</button>{/*changed delete*/}
            <p className="date">{aar.AAR_Activity_Date}</p>{/*this should be the date of the submission*/}
        </div>
        {expandedFeeds[aar.AAR_ID] && (
              <div className="feedDropdown">
                <ul>
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