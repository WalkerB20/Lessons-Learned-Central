import React, { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
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
    sustainitle: '',
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
          throw new Error('Failed to delete this item:', response.status);
        // will in theory remove the deleted feed item from the state
        }
        setAarData(aarData.filter(item => item.id !== aarId));//previously feedId
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
          <button className="toggleButton" onClick={() => toggleFeed(`feed${index}`)}>{/*added the index to get the data*/}
            {expandedFeeds[`feed${index}`] ? <FaMinus /> : <FaPlus />}{/*samesies*/}
          </button>
          <h3>{aar.AAR_Name}</h3>{/*hopefully this takes the naming convention of the submission*/}
          <div className="buttonGroup">
            <button onClick={() => handleLike(`feed${index}`)}>Like({likes[`feed${index}`]})</button>{/*changed likes*/}
            <button onClick={() => handleEdit(aar.id)}>Edit</button>{/*changed edit*/}
            <button onClick={() => handleDelete(aar.id)}>Delete</button>{/*changed delete*/}
            <p className="date">{aar.AAR_Activity_Date}</p>{/*this should be the date of the submission*/}
        </div>
        {expandedFeeds[`feed${index}`] && (
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
//your original code
// import React, { useState } from 'react';
// import { FaPlus } from "react-icons/fa";
// import { FaMinus } from "react-icons/fa";
// import '../Styles/Feed.css';
// const Feed = () => {
//   // State to manage the likes for each feed content
//   const [expandedFeeds, setExpandedFeeds] = useState({});
//   const [likes, setLikes] = useState({
//     feed1: 0,
//     feed2: 0,
//     feed3: 0
//   });
//   const handleLike = (feedName) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [feedName]: prevLikes[feedName] + 1
//     }));
//   };
//   const toggleFeed = (feedId) => {
//     setExpandedFeeds((prevState) => ({
//       ...prevState,
//       [feedId]: !prevState[feedId],
//     }));
//   };
//   return (
//     <div className="feed">
//       <div className="feedHeader">
//         <h1>FEEDS</h1>
//         <select className="sortBy">
//           <option value="null">Sort By</option>
//           <option value="popular">Popular</option>
//           <option value="recent">Recent</option>
//         </select>
//       </div>
//       <div className="viewByButton">
//         <button type='button'>View By Title</button> {/*Made changes here, previously alphabetically*/}
//       </div>
//       <div className="viewByButton">
//         <button type='button'>View By Comment</button>
//       </div>
//       {/* This will just have to be mapped with feed content */}
//       <div className="feedContentContainer">
//         <div className="feedContent">
//           <button className="toggleButton" onClick={() => toggleFeed('feed1')}>
//             {expandedFeeds['feed1'] ? <FaMinus /> : <FaPlus />}
//           </button>
//           <h3>Placeholder for feed 1</h3>
//           <div className="buttonGroup">
//             <button className="deleteButton" type="button">
//               Delete
//             </button>
//             <button className="editButton" type="button">
//               Edit
//             </button>
//             <p className="date">01/01/2024</p>
//             <button onClick={() => handleLike('feed1')}>Like ({likes.feed1})</button>
//           </div>
//           {expandedFeeds['feed1'] && (
//             // What displace for when the feed button is expanded
//             <div className="feedDropdown">
//               <ul>
//                 <ol>
//                   WHAT WENT RIGHT
//                 </ol>
//                 <ol>
//                   WHAT WENT WRONG
//                 </ol>
//               </ul>
//             </div>
//           )}
//         </div>
//         <div className="feedContent">
//           <button className="toggleButton" onClick={() => toggleFeed('feed2')}>
//             {expandedFeeds['feed2'] ? <FaMinus /> : <FaPlus />}
//           </button>
//           <h3>Placeholder for feed 2</h3> {/*should this be the event title?*/}
//           <div className="buttonGroup">
//             <button className="deleteButton" type="button">
//               Delete
//             </button>
//             <button className="editButton" type="button">
//               Edit
//             </button>
//             <p className="date">01/01/2024</p>
//             <button onClick={() => handleLike('feed2')}>Like ({likes.feed2})</button>
//           </div>
//           {expandedFeeds['feed2'] && (
//             <div className="feedDropdown">
//               <ul>
//                 <ol>
//                   WHAT WENT RIGHT
//                 </ol>
//                 <ol>
//                   WHAT WENT WRONG
//                 </ol>
//               </ul>
//             </div>
//           )}
//         </div>
//         <div className="feedContent">
//           <button className="toggleButton" onClick={() => toggleFeed('feed3')}>
//             {expandedFeeds['feed3'] ? <FaMinus /> : <FaPlus />}
//           </button>
//           <h3>Placeholder for feed 3</h3>
//           <div className="buttonGroup">
//             <button className="deleteButton" type="button">
//               Delete
//             </button>
//             <button className="editButton" type="button">
//               Edit
//             </button>
//             <p className="date">01/01/2024</p>
//             <button onClick={() => handleLike('feed3')}>Like ({likes.feed3})</button>
//           </div>
//           {expandedFeeds['feed3'] && (
//             <div className="feedDropdown">
//               <ul>
//                 <ol>
//                   WHAT WENT RIGHT
//                 </ol>
//                 <ol>
//                   WHAT WENT WRONG
//                 </ol>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Feed;
