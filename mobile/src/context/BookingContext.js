import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    testName: 'Heart beat test',
    labName: 'Peak Diagnostic Laboratory',
    price: '₦45,90.09', // From design mockup N45,90.09
    symptoms: [],
    details: '',
    appointmentType: 'Walk-in', // or 'Home service'
    date: null,
    time: '08:00',
  });

  const updateBooking = (newData) => {
    setBookingData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
