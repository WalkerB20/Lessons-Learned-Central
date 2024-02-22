import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../Styles/AARComponent.css';

export default function AARComponent() {
  const url = 'http://localhost:3001';
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventType: '',
    eventLocation: '',
    sustainTitle: '',
    commentsSustain: '',
    recommendationsSustain: '',
    improveTitle: '',
    commentsImprove: '',
    recommendationsImprove: '',
    additionalOptions: '',//needed for the extra options field
    additionalInput: '',//needed for the extra input field
    eventDate: new Date()//for the calendar
  });

  const handleChange = (event) => {
    console.log('handleChange called');//console to debug
    const { name, value } = event.target;
    console.log('Name:', name, 'Value:', value);//console to debug
    if (name === 'eventType') {
    setFormData({
      ...formData,
      [name]: value,
      additionalOptions: '',
      additionalInput: '',//needed for the extra input field
      eventDate: new Date()
    });
  } else if (name === 'additionalOptions') {
    setFormData({
      ...formData,
      [name]: value,
      additionalInput: '',//needed for the extra input field
    });
  } else {
    setFormData({
      ...formData,
      [name]: value
    });
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handles the form submission
    console.log('Form submitted:', formData);

    // Fetch request
    fetch(`${url}/events`, {
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
      eventDate: '',
      eventLocation: '',
      sustainTitle: '',
      commentsSustain: '',
      recommendationsSustain: '',
      improveTitle: '',
      commentsImprove: '',
      recommendationsImprove: '',
      additionalOptions: '', //needed for the extra input field
      additionalInput: '',//needed for the extra input field
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      eventDate: date
    });
  };

  const renderAdditionalOptions = () => {
    switch (formData.eventType) {
      case 'Range':
        return (
          <>
            <option value="M4">M4</option>
            <option value="240B">240B</option>
            <option value="320">320</option>
            <option value="M9">M9</option>
            <option value="Other">Other</option>
          </>
        );

      case 'Deployment':
        return (
          <>
            <option value="GCC">GCC</option>
            <option value="Pre-deployment">Pre-deployment</option>
            <option value="Packinglist">Packing List</option>
            <option value="Equipment">Equipment</option>
            <option value="Post-deployment">Post-deployment</option>
            <option value="Other">Other</option>
          </>
        );

      case 'FTX':
        return (
          <>
            <option value="TNGSite">Training Site</option>
            <option value="Logistics">Logistics</option>
            <option value="TNGModules">Training Modules</option>
            <option value="LeadUpTraining">Lead-up Training</option>
            <option value="Packinglist">Packing List</option>
            <option value="Other">Other</option>
          </>
        );

      case 'Equipment':
        return (
          <>
            <option value="EquipmentType">Equipment Type</option>
            <option value="EquipmentStatus">Equipment Status</option>
            <option value="Other">Other</option>
          </>
        );

      case 'AirborneOps':
        return (
          <>
            <option value="JumpManifest">Jump Manifest</option>
            <option value="JumpStatus">Jump Status</option>
            <option value="JumpEquipment">Jump Equipment</option>
            <option value="JumpSafety">Jump Safety</option>
            <option value="JumpmasterRehearsals">Jumpmaster Rehearsals</option>
            <option value="JMPI">JMPI</option>
            <option value="Other">Other</option>
          </>
        );

      case 'Other':
        return null;

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
          <input type="text" placeholder="Give a title to your event" name="eventTitle" value={formData.eventTitle} onChange={handleChange} />

          <label>Event Type:</label>
            <select name="eventType" value={formData.eventType} onChange={handleChange}>
              <option value="Select">Select an option</option>
              <option value="Range">Range</option>
              <option value="Deployment">Deployment</option>
              <option value="FTX">FTX</option>
              <option value="Equipment">Equipment</option>
              <option value="AirborneOps">Airborne Operations</option>
              <option value="Other">Other</option>
            </select>

          {formData.eventType && formData.eventType !== 'Other' && (
            <>
              <label>Additional Options:</label> {/*can change name to whatever*/}
              <select
                name="additionalOptions"
                value={formData.additionalOptions}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                {renderAdditionalOptions()}
              </select>

              {formData.additionalOptions === 'Other' && (
                <input
                  type="text"
                  name="additionalInput"
                  value={formData.additionalInput}
                  onChange={handleChange}
                  placeholder="Provide additional information"/>  /*can change name to whatever*/
              )}
            </>
          )}

              {formData.eventType === 'Other' && (
                <>
                  <label>Additional Information:</label> {/* we can change this to whatever we want*/}
                  <input
                    type="text"
                    name="additionalInput"
                    value={formData.additionalInput}
                    onChange={handleChange}
                    placeholder="Provide additional information"/>  {/*can change to whatever as well*/}
                </>
              )}

          <label>Event Date:</label>
          <DatePicker
            selected={formData.eventDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd" // date format can be adjusted if we need to
            className={styles.datePicker}
          />

          <label>Event Location:</label>
          <input type="text" placeholder="Where did your event take place?" name="eventLocation" value={formData.eventLocation} onChange={handleChange} />

          <label>Sustain:</label>
          <input
            type="text"
            placeholder="Your sustain title here."
            name="sustainTitle"
            value={formData.sustainTitle}
            onChange={handleChange}/>
          <textarea
            name="commentsSustain"
            placeholder='Discussion. What happened?'
            value={formData.commentsSustain}
            onChange={handleChange}></textarea>
          <textarea
            name="recommendationsSustain"
            placeholder='Recommendation. What can be sustained for the future?'
            value={formData.recommendationsSustain}
            onChange={handleChange}></textarea>

          <label>Improve:</label>
          <input
            type="text"
            placeholder="Your improvement title here."
            name="improveTitle"
            value={formData.improveTitle}
            onChange={handleChange}/>
          <textarea
            name="commentsImprove"
            placeholder="Discussion. What went wrong?"
            value={formData.commentsImprove}
            onChange={handleChange}></textarea>
          <textarea
            name="recommendationsImprove"
            placeholder="Recommendation. What can be improved?"
            value={formData.recommendationsImprove}
            onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};