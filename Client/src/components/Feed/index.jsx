import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";//combined both imports into one line
import '../Styles/Feed.css';
//import AARComponent from '../AARComponent'; thought i would need, but i
const Feed = () => {
  // State to manage the likes for each feed content
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
  const feedUrl = 'http://localhost:3001'; //created this variable to store the URL and use in the fetch request
  useEffect(() => {//the GET request to fetch data from the server
    const fetchAarData = async () => {
      try {
        const response = await fetch(`${feedUrl}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch AAR data');
        }
        const responseData = await response.json();
        const aarData = responseData.aarData; // Extracting the array of AAR data
        if (!Array.isArray(aarData)) {
          throw new Error('Invalid data format: expected an array');
        }
        setAarData(aarData);
      } catch (error) {
        console.error('Failed to fetch AAR data:', error);
      }
    };
      fetchAarData();
    }, []);
  const handleLike = (feedName) => {//should this be married up with server language???
    setLikes((prevLikes) => ({
      ...prevLikes,
      [feedName]: prevLikes[feedName] + 1
    }));
  };
  const toggleFeed = (aarId) => {//previously feedId
    setExpandedFeeds((prevState) => ({
      ...prevState,
      [aarId]: !prevState[aarId],//previous feedId
    }));
  };
  const handleDelete = (aarId) => {//previously feedId
    // Sends delete request to the server
    fetch(`${feedUrl}/events/${aarId}`, {//previuosly llc
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete item with ID ${aarId}. Status: ${response.status}`);
        // will in theory remove the deleted feed item from the state
        }
        setAarData(aarData.filter(item => item.AAR_ID !== aarId));//previously feedId - also updated to AAR_ID
        //we can input alerts like we did the previous project if we want.
      })
      .catch ((error) => {
        console.error('Error deleting feed item:', error);
    });
  };
  const handleEdit = (aarId) => {//previously feedId
    // Implements the edit functionality
    console.log('Edit feed item:', aarId);//previously feedId
    const feedToEdit = { ...editedValues }; // Using editedValues for edit data
    try {
      fetch(`${feedUrl}/events/${aarId}`, {//previously llc
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedToEdit)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to edit this item:', response.status);
      }
      return response.json();
    })
    .then((data) => {
        //handles a successful edit
    })
    .catch ((error) => {
      console.error('Error editing feed item:', error);
    });
  } catch (error) {
    console.error('Error editing feed item:', error);
  };
}
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
                  <li>Comments for Sustain: {aar.CommentsForSustain}</li>
                  <li>Comments for Improve: {aar.CommentsForImprove}</li>
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