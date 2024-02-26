import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FaPlus, FaMinus } from "react-icons/fa";//combined both imports into one line
import '../Styles/Feed.css';
//import AARComponent from '../AARComponent'; thought i would need, but i
const Feed = () => {
  // State to manage the likes for each feed content
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [likes, setLikes] = useState({
    feed1: 0,
    feed2: 0,
    feed3: 0
  });
  const [aarData, setAarData] = useState([]);//added this line to fetch data from the server
  const [editedValues, setEditedValues] = useState({
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
  });//added this line to edit the data from the server
  const getroutes = 'http://localhost:3001/api'; //created this variable to store the URL and use in the fetch request
  const deleteroutes = 'http://localhost:3001/api'; //created this variable to store the URL and use in the fetch request
  const patchroutes = 'http://localhost:3001/api'
  useEffect(() => {
    const fetchAarData = async () => {
      if (!isAuthenticated) return; // Exit if not authenticated

      try {
        const token = await getAccessTokenSilently(); // Get access token for the logged-in user
        const response = await fetch(`${getroutes}/postdata`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the access token in API requests
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch AAR data');
        }
        const responseData = await response.json();
        setAarData(responseData.aarData); // Assuming responseData.aarData is the correct data structure
      } catch (error) {
        console.error('Failed to fetch AAR data:', error);
      }
    };
    fetchAarData();
  }, [isAuthenticated, getAccessTokenSilently]);
  
  const handleLike = async (postId) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${getroutes}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
  
      if (!response.ok) {
        if (response.status === 409) {
          // Handle already liked case
          console.log("You've already liked this post.");
        } else {
          throw new Error('Failed to like the post');
        }
      } else {
        // Update likes state or UI accordingly
        console.log('Post liked successfully.');
        // Optionally fetch updated likes count or list here
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  
  const toggleFeed = (aarId) => {//previously feedId
    setExpandedFeeds((prevState) => ({
      ...prevState,
      [aarId]: !prevState[aarId],//previous feedId
    }));
  };
  const handleDelete = async (aarId) => {
    try {
      const token = await getAccessTokenSilently(); // Get access token
      await fetch(`${deleteroutes}/postdelete/${aarId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the access token in the request
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
      const token = await getAccessTokenSilently(); // Get access token for the logged-in user
      const feedToEdit = { ...editedValues }; // Assuming editedValues contains the data to be edited
  
      const response = await fetch(`${patchroutes}/postpatch/${aarId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the access token in the request header
        },
        body: JSON.stringify(feedToEdit),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to edit item with ID ${aarId}. Status: ${response.status}`);
      }
  
      const updatedItem = await response.json(); // Assuming the server responds with the updated item
  
      // Update local state to reflect the edit
      // This step depends on your state structure and what the server returns
      // Here's a generic example of how you might update the aarData state
      // This assumes aarData is an array of items and each item has a unique ID
      setAarData(aarData.map(item => item.AAR_ID === aarId ? { ...item, ...updatedItem } : item));
  
    } catch (error) {
      console.error('Error editing feed item:', error);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
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
          <div className="buttonGroup">
            <button onClick={() => handleLike(aar.AAR_ID)}>Like({likes[aar.AAR_ID]})</button>{/*changed likes*/}
            <button onClick={() => handleEdit(aar.AAR_ID)}>Edit</button>{/*changed edit*/}
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