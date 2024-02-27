import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import '../Styles/Feed.css';
import { useAuth0 } from '@auth0/auth0-react';

const Feed = ({ searchTerm, setSearchTerm }) => {
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [aarData, setAarData] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');
  const { getAccessTokenSilently } = useAuth0();
  const [viewBy, setViewBy] = useState('title');
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
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(`${getroutes}/postdata`, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch AAR data');
        }
        let responseData = await response.json();
        responseData = responseData.aarData;

        // Sort data
        if (sortOrder === 'popular') {
          responseData.sort((a, b) => b.likes - a.likes);
        } else { // 'recent'
          responseData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Filter data
        if (viewBy === 'comment') {
          responseData = responseData.filter(item => item.comments.length > 0);
        }

        // Search data
        if (searchTerm) {
          responseData = responseData.filter(item =>
            item.AAR_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.AAR_Location.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setAarData(responseData);
      } catch (error) {
        console.error('Failed to fetch AAR data:', error);
      }
    };
    fetchAarData();
  }, [sortOrder, viewBy, searchTerm]);

  const handleLike = async (postId) => {
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(`${postroutes}/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
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
    const token = await getAccessTokenSilently();
    try {
      await fetch(`${deleteroutes}/postdelete/${aarId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
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
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(`${patchroutes}/postpatch/${aarId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAarData = Array.isArray(aarData) ? aarData.filter(aar =>
    (aar.AAR_Name ? aar.AAR_Name.toLowerCase().includes((searchTerm || "").toLowerCase()) : false) ||
    (aar.AAR_Location ? aar.AAR_Location.toLowerCase().includes((searchTerm || "").toLowerCase()) : false)
  ) : [];

  const handleSortByChange = (event) => {
    console.log(`Sorting by: ${event.target.value}`);
  };

  const handleViewByTitle = () => {
    console.log('Viewing by title');
  };

  const handleViewByComment = () => {
    console.log('Viewing by comment');
  };

  return (
    <div className="feed">
      <div className="feedHeader">
        <h1>FEEDS</h1>
        <select className="sortBy" onChange={handleSortByChange}>
          <option value="null">Sort By</option>
          <option value="popular">Popular</option>
          <option value="recent">Recent</option>
        </select>
      </div>
      <div className="viewByButton">
        <button type='button' onClick={handleViewByTitle}>View By Title</button>
        <button type='button' onClick={handleViewByComment}>View By Comment</button>
      </div>
      <div className="feedContentContainer">
      {filteredAarData.map((aar, index) => (
        <div className="feedContent" key={index}>
          <button className="toggleButton" onClick={() => toggleFeed(aar.AAR_ID)}>
            {expandedFeeds[aar.AAR_ID] ? <FaMinus /> : <FaPlus />}
          </button>
          <h3>{aar.AAR_Name}</h3>
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
            <button onClick={() => handleDelete(aar.AAR_ID)}>Delete</button>
            <p className="date">{aar.AAR_Activity_Date}</p>
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
