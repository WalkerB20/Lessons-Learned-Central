import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../Styles/AARComponent.css';

export default function AARComponent() {
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventType: '',
    eventLocation: '',
    commentsSustain: '',
    commentsImprove: '',
    additionalOptions: '',//needed for the extra input field
    eventDate: new Date()//for the calendar
  });

  const handleChange = (e) => {
    console.log('handleChange called');//console to debug
    const { name, value } = e.target;
    console.log('Name:', name, 'Value:', value);//console to debug
    if (name === 'eventType') {
    setFormData({
      ...formData,
      [name]: value,
      additionalOptions: '',
      eventDate: new Date()
    });
  } else {
    setFormData({
      ...formData,
      [name]: value
    });
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handles the form submission
    console.log('Form submitted:', formData);
    // Form reset after submission
    setFormData({
      eventTitle: '',
      eventType: '',
      eventDate: '',
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
    switch (formData.eventType) {
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
            case 'AirborneOps':
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