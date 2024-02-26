import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../Styles/AARComponent.css';
import '../Styles/index.css';
import '../Styles/App.css';

export default function AARComponent() {
  const url = 'http://localhost:3001';//previously llc
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventType: '',
    eventLocation: '',
    sections: [{
      type: '',
      title: '',
      comments: '',
      recommendations: ''
    }],
    additionalOptions: '',//needed for the extra options field
    additionalInput: '',//needed for the extra input field
    eventDate: new Date()//for the calendar
  });
useEffect(() => {
  if (formData.eventType !== 'Other' && formData.eventType === 'Other') {
    setFormData(prevState => ({
      ...prevState,
      additionalOptions: '',
      additionalInput: '',
    }));
  }
}, [formData.eventType, formData.additionalOptions]);
const handleChange = (event, index) => {
  const { name, value } = event.target;
  if (name === 'eventType' || name === 'additionalOptions') {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      additionalInput: value === 'Other' ? '' : prevState.additionalInput,
      sections: value === 'Other' ?
        [{ type: '', title: '', comments: '', recommendations: '' }] : prevState.sections
    }));
  } else if (name === 'eventTitle' || name === 'additionalInput' || name === 'eventLocation') {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  } else { // For section fields
    const updatedSections = [...formData.sections];
    updatedSections[index] = { ...updatedSections[index], [name]: value };
    setFormData(prevState => ({
      ...prevState,
      sections: updatedSections
    }));
  }
};
const handleAddSection = () => {
  setFormData(prevState => ({
    ...prevState,
    sections: [...prevState.sections, { type: '', title: '', comments: '', recommendations: '' }]
  }));
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
      eventDate: new Date(),
      eventLocation: '',
      additionalOptions: '', //needed for the extra input field
      additionalInput: '',//needed for the extra input field
      sections: [{
        type: '',//maybe an empty string?
        title: '',
        comments: '',
        recommendations: ''
      }],
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
            <option value="M4">M4</option>
            <option value="240B">240B</option>
            <option value="320">320</option>
            <option value="M9">M9</option>
            <option value="Other">Other</option>
              {/* {/* {formData.additionalOptions === 'Other' ? (
              <input
                type="text"
                name="additionalOptions"
                value={formData.additionalOptions}
                onChange={handleChange} */}
              {/* />
            ) : null} */}
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
            {/* {/* {formData.additionalOptions === 'Other' ? (
              <input
                type="text"
                name="additionalOptions"
                value={formData.additionalOptions}
                onChange={handleChange}
              />
            ) : null} */}
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
              {/* {formData.additionalOptions === 'Other' ? (
                <input
                  type="text"
                  name="additionalOptions"
                  value={formData.additionalOptions}
                  onChange={handleChange}
                />
              ) : null} */}
            </>
          );
          case 'Equipment':
            return (
              <>
                <option value="EquipmentType">Equipment Type</option>
                <option value="EquipmentStatus">Equipment Status</option>
                {/* {formData.additionalOptions === 'Other' ? (
                  <input
                    type="text"
                    name="additionalOptions"
                    value={formData.additionalOptions}
                    onChange={handleChange}
                  />
                ) : null} */}
              </>
            );
            case 'Airborne':
              return (
                <>
                  <option value="JumpManifest">Jump Manifest</option>
                  <option value="JumpStatus">Jump Status</option>
                  <option value="JumpEquipment">Jump Equipment</option>
                  <option value="JumpSafety">Jump Safety</option>
                  <option value="JumpmasterRehearsals">Jumpmaster Rehearsals</option>
                  <option value="JMPI">JMPI</option>
                  {/* {formData.additionalOptions === 'Other' ? (
                    <input
                      type="text"
                      name="additionalOptions"
                      value={formData.additionalOptions}
                      onChange={handleChange}
                    />
                  ) : null} */}
                </>
              );
            case 'Other':
              return (
                <>
                  <option value="Other">Other</option>
                    {/* {formData.additionalOptions === 'Other' ? (
                      <input
                        type="text"
                        name="additionalOptions"
                        value={formData.additionalOptions}
                        onChange={handleChange}
                      />
                    ) : null} */}
                </>
              );
      default:
        return null;
    }
  };
  return (
    <div className="aarForm">
      <h1>After Action Review Form</h1>{/*can change name to whatever*/}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title:</label>
          <input type="text" placeholder="Give a title to your event" name="eventTitle" value={formData.eventTitle} onChange={handleChange} />
          <label>Event Type:</label>
            <select name="eventType" value={formData.eventType} onChange={handleChange}>
              <option value="">Select an option</option>{/*changed "select" to ""*/}
              <option value="Range">Range</option>
              <option value="Deployment">Deployment</option>
              <option value="FTX">FTX</option>
              <option value="Equipment">Equipment</option>
              <option value="Airborne">Airborne Operations</option>
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

          {formData.sections.map((section, index) => (
            <div key={index} className="aar-section">
              <label>Comments:</label>
              <select
                name="type"
                value={section.type}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="">Select a comment type...</option>
                <option value="sustain">Sustain</option>
                <option value="improve">Improve</option>
              </select>
              {section.type && ( // Render text fields only if a comment type is selected
                <>
                  <input
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Your ${section.type === 'sustain' ? 'sustain' : 'improvement'} title here.`}
                  />
                  <textarea
                    name="comments"
                    value={section.comments}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Discussion. What ${section.type === 'sustain' ? 'happened' : 'went wrong'}?`}
                  ></textarea>
                  <textarea
                    name="recommendations"
                    value={section.recommendations}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Recommendation. What can be ${section.type === 'sustain' ? 'sustained' : 'improved'} for the future?`}
                  ></textarea>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="form-footer">
          <button type="button" onClick={handleAddSection}>Add comment</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}