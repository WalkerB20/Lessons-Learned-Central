import React, { useState, useEffect } from 'react';
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import EditIcon from '../EditIcon';
import DeleteIcon from '../DeleteIcon';
import { IconContext } from "react-icons";
import Like from '../Like';
import '../Styles/Feed.css';
import '../Styles/Like.css';

const Feed = ({ searchTerm, setSearchTerm }) => {
  const [expandedFeeds, setExpandedFeeds] = useState({});
  const [improveCommentData, setImproveCommentData] = useState([]);
  const [sustainCommentData, setSustainCommentData] = useState([]);
  const [aarData, setAarData] = useState([]);
  const [sortOrder] = useState('recent');
  const [viewBy, setViewBy] = useState('title');
  const [editedValues, setEditedValues] = useState({
    eventTitle: '',
    eventLocation: '',
    eventDate: '',
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const getroutes = 'http://localhost:3001/api';
  const deleteroutes = 'http://localhost:3001/api';
  const patchroutes = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchAarData = async () => {
      try {
        const response = await fetch(`${getroutes}/postdata`, {});
        if (!response.ok) {
          throw new Error('Failed to fetch AAR data');
        }
        let responseData = await response.json();
        responseData = responseData.aarData;
              // Fetch improve comment data
        const responseImprove = await fetch(`${getroutes}/improve`, {});
        if (!responseImprove.ok) {
          throw new Error('Failed to fetch improve comment data');
        }
        const improveData = await responseImprove.json();

              // Fetch sustain comment data
        const responseSustain = await fetch(`${getroutes}/sustain`, {});
        if (!responseSustain.ok) {
          throw new Error('Failed to fetch sustain comment data');
        }
        const sustainData = await responseSustain.json();
                // Sort data
        if (sortOrder === 'popular') {
          responseData.sort((a, b) => b.likes - a.likes);
        } else {
          responseData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        // Filter data by comment
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
        setImproveCommentData(improveData);
        setSustainCommentData(sustainData);

      } catch (error) {
        console.error('Failed to fetch AAR data:', error);
      }
    };
    fetchAarData();
  }, [sortOrder, viewBy, searchTerm]);

  const toggleFeed = (aarId) => {
    setExpandedFeeds((prevState) => ({
      ...prevState,
      [aarId]: !prevState[aarId],
    }));
  };

  const handleDelete = async (aarId) => {
    console.log(`Deleting post with ID: ${aarId}`);
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
      setEditingItemId(null);
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

  const handleViewByTitle = () => {
    setViewBy('title');
    setExpandedFeeds({});
  };

  const handleViewByComment = () => {
    setViewBy('comment');
    // Automatically expand all feed items
    const newExpandedFeeds = {};
    aarData.forEach(aar => {
      newExpandedFeeds[aar.AAR_ID] = true;
    });
    setExpandedFeeds(newExpandedFeeds);
  };

  // const handleToggleComments = (aarId) => {
  //   setExpandedFeeds((prevState) => ({
  //     ...prevState,
  //     [aarId]: !prevState[aarId],
  //   }));
  // };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="feed">
      <div className="feedHeader">
        <h1>FEEDS</h1>
        <div className="viewByButton">
          <button type='button' onClick={handleViewByTitle}>View By Title</button>
          <button type='button' onClick={handleViewByComment}>View By Comment</button>
        </div>
      </div>

      <div className="feedContentContainer">
        {aarData.map((aar, index) => (
          <div className="feedContent" key={index}>
            <div className="feedContent-title-bubble">
              <button onClick={() => toggleFeed(aar.AAR_ID)}>
                <IconContext.Provider value={{className:"toggleButton"}}>
                  {expandedFeeds[aar.AAR_ID] ? <AiFillCaretDown/> : <AiFillCaretRight />}
                </IconContext.Provider>
              </button>
              <div className="feedContent-title-line">
                <h3 className="title-feed">{aar.AAR_Name}</h3>
                <h2 className="location">Location: {aar.AAR_Location}</h2>
                <p className="date">{formatDate(aar.AAR_Activity_Date)}</p>
              </div>
              <div className="comment-right">
                {editingItemId === aar.AAR_ID ? (
                  <div className="input">
                    <input type="text" name="eventTitle" value={editedValues.eventTitle} onChange={handleChange} placeholder="Event Title"/>
                    <input type="text" name="eventLocation" value={editedValues.eventLocation} onChange={handleChange} placeholder="Event Location" />
                    <input type="date" name="eventDate" value={editedValues.eventDate} onChange={handleChange} />
                    <button id="submit" onClick={() => handleEdit(aar.AAR_ID)}>Submit</button>
                  </div>
                ) : (
                  <button onClick={() => setEditingItemId(aar.AAR_ID)}><EditIcon /></button>
                )}
                <button onClick={() => handleDelete(aar.AAR_ID)}><DeleteIcon /></button>
              </div>
            </div>
            <div className="feedDropdown" style={{ display: expandedFeeds[aar.AAR_ID] || (viewBy === 'comment' && expandedFeeds[aar.AAR_ID]) ? 'block' : 'none' }}>
              <ul className="feedDropDown-comment">
                {improveCommentData.filter(comment => comment.Improve_Comment_ID === aar.Improve_Comment_ID).map(comment => (
                  <li className="comment-details-container" key={comment.Improve_Comment_ID}>
                    <div id="comment-header">
                      <p>Improve: {comment.Improve_Comment_Title}</p>
                    </div>
                    <div className="comments-wrapper">
                    <div className="comments">
                    <p className="comment-discussion">Discussion: {comment.Improve_Comment_Discussion}</p>
                    <p className="comment-recommendation">Recommendation: {comment.Improve_Comment_Recommendation}</p>
                    </div>
                    <Like
                      commentId={comment.Improve_Comment_ID}
                      commentType="improve"
                      likeCount={comment.Like_Count}
                    />
                    </div>
                  </li>
                ))}
                {sustainCommentData.filter(comment => comment.Sustain_Comment_ID === aar.Sustain_Comment_ID).map(comment => (
                  <li className="comment-details-container" key={comment.Sustain_Comment_ID}>
                    <div id="comment-header">
                      <p>Sustain: {comment.Sustain_Comment_Title}</p>
                    </div>
                    <div className="comments-wrapper">
                    <div className="comments">
                    <p className="comment-discussion">Discussion: {comment.Sustain_Comment_Discussion}</p>
                    <p className="comment-recommendation">Recommendation: {comment.Sustain_Comment_Recommendation}</p>
                    </div>
                    <Like
                      commentId={comment.Sustain_Comment_ID}
                      commentType="sustain"
                      likeCount={comment.Like_Count}
                    />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
