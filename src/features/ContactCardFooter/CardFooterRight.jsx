"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './CardFooterRight.css';

const CardFooterRight = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(() => {
    const d = new Date();
    d.setHours(9, 15, 0, 0);
    return d;
  });

  return (
    <section className="contact-card" aria-labelledby="contact-heading">
      <form className="contact-form">
        <fieldset>
          <div className="form-grid">
            <div className='form-row'>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>
            </div>

            <div className='form-row'>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="Ortho"
                />
              </div>
            </div>

            <div className='form-row'>
              <div className="form-group">
                <label htmlFor="footer-time">Time</label>
                <DatePicker
                  id="footer-time"
                  selected={time}
                  onChange={setTime}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select a time"
                  className="dp-input dp-input--time"
                />
              </div>

              <div className="form-group">
                <label htmlFor="footer-date">Date</label>
                <DatePicker
                  id="footer-date"
                  selected={date}
                  onChange={setDate}
                  dateFormat="MMM d, yyyy"
                  placeholderText="Select a date"
                  className="dp-input dp-input--date"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Anything else you wanna communicate"
          />
        </div>

        <footer className="form-footer">
          <button type="submit">Submit</button>
        </footer>
      </form>
    </section>
  );
}

export default CardFooterRight;
