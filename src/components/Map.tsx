import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="w-full h-[400px] relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.1776559286387!2d10.338988399999999!3d36.8716671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b50079a27d0b%3A0xd816c6af41ff627!2sVegeta!5e0!3m2!1sen!2stn!4v1711011391234!5m2!1sen!2stn"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map; 