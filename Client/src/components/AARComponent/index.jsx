import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../Styles/AARComponent.css';

export default function AARComponent() {

  const url = 'http://localhost:3001/llc';

  const [formData, setFormData] = useState({
    eventTitle: '',
    eventType: '',
    eventLocation: '',
    commentsSustain: '',
    commentsImprove: '',
    additionalOptions: '',//needed for the extra input field
    eventDate: new Date()//for the calendar
  });

  const [rangeItems, setRangeItems] = useState([]);
  const [deploymentItems, setDeploymentItems] = useState([]);
  const [ftxItems, setFtxItems] = useState([]);
  const [equipmentItems, setEquipmentItems] = useState([]);
  const [airborneOpsItems, setAirborneOpsItems] = useState([]);

  useEffect(() => {
    // Fetch data based on the event type
    // Replace with your actual URLs
    switch(formData.eventType) {
      case 'Range':
        fetch('http://localhost:3001/aar/rangeItems')
          .then(response => response.json())
          .then(data => setRangeItems(data));
        break;
      case 'Deployment':
        fetch('http://localhost:3001/aar/deploymentItems')
          .then(response => response.json())
          .then(data => setDeploymentItems(data));
        break;
      case 'FTX':
        fetch('http://localhost:3001/aar/ftxItems')
          .then(response => response.json())
          .then(data => setFtxItems(data));
        break;
      case 'Equipment':
        fetch('http://localhost:3001/aar/equipmentItems')
          .then(response => response.json())
          .then(data => setEquipmentItems(data));
        break;
      case 'AirborneOps':
        fetch('http://localhost:3001/aar/airborneOpsItems')
          .then(response => response.json())
          .then(data => setAirborneOpsItems(data));
        break;
      default:
        break;
    }
  }, [formData.eventType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let additionalOptions = formData.additionalOptions;
    if (name === 'eventType' && value === 'Range' && !rangeItems.find(item => item.Range_ID === value)) {
      additionalOptions = 'Other';
    }
    setFormData({
      ...formData,
      [name]: value,
      additionalOptions
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handles the form submission
    console.log('Form submitted:', formData);

    // Fetch request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });

    // Form reset after submission
    setFormData({
      eventTitle: '',
      eventType: '',
      eventDate: new Date(),
      eventLocation: '',
      commentsSustain: '',
      commentsImprove: '',
      additionalOptions: '' //needed for the extra input field
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      eventDate: date
    });
  };

  const renderAdditionalOptions = () => {
    switch(formData.eventType) {
      case 'Range':
        return (
          <>
            {rangeItems.map(item => (
              <option key={item.Range_ID} value={item.Range_ID}>{item.Event_Type}</option>
            ))}
          </>
        );
      case 'Deployment':
        return (
          <>
            {deploymentItems.map(item => (
              <React.Fragment key={item.Deployment_ID}>
                <option value={item.Deployment_ID}>{item.Event_Type}</option>
              </React.Fragment>
            ))}
          </>
        );
      case 'FTX':
        return (
          <>
            {ftxItems.map(item => (
              <React.Fragment key={item.FTX_ID}>
              <option key={item.FTX_ID}>{item.Event_Type}</option>
              </React.Fragment>
            ))}
          </>
        );
      case 'Equipment':
        return (
          <>
            {equipmentItems.map(item => (
              <React.Fragment key={item.Equipment_ID}>
              <option key={item.Equipment_ID}>{item.Event_Type}</option>
              </React.Fragment>
            ))}
          </>
        );
      case 'AirborneOps':
        return (
          <>
            {airborneOpsItems.map(item => (
              <React.Fragment key={item.Airborne_Operation_ID}>
              <option key={item.Airborne_Operation_ID}>{item.Event_Type}</option>
              </React.Fragment>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="aarForm">
      <h2>After Action Review Form</h2>{/*can change name to whatever*/}
      <form onSubmit={handleSubmit}>
        <div className="form-group">

          <label>Event Title:</label>
          <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleChange} />

          <label>Event Type:</label>
          {/* <div className="event-type-select"> */}
            <select name="eventType" value={formData.eventType} onChange={handleChange}>
              <option value="Select">Select an option</option>
              <option value="Range">Range</option>
              <option value="Deployment">Deployment</option>
              <option value="FTX">FTX</option>
              <option value="Equipment">Equipment</option>
              <option value="AirborneOps">Airborne Operations</option>
              <option value="Other">Other</option>
            </select>
            {/* <span className="helper-text">Please select the type of event</span> */}
          {/* </div> */}
          {formData.eventType && (
            <>
              <label>Additional Options:</label> {/*can change name to whatever*/}
              <select name="additionalOptions" onChange={handleChange}>
                <option value="">Select...</option>
                {renderAdditionalOptions()}
              </select>
            </>
          )}

          <label>Event Date:</label>
          <DatePicker
            selected={formData.eventDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd" // Adjust date format as needed
            className={styles.datePicker}
          />

          <label>Event Location:</label>
          <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} />

          <label>Comments for Sustain:</label>
          <textarea name="commentsSustain" value={formData.commentsSustain} onChange={handleChange}></textarea>

          <label>Comments for Improve:</label>
          <textarea name="commentsImprove" value={formData.commentsImprove} onChange={handleChange}></textarea>

        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};