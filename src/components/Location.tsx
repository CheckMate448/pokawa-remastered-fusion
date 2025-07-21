import React from 'react';
import Map from './Map';

const Location = () => {
  return (
    <section id="location" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">Visit Us</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-6">
            Our Location
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Come visit us and experience the authentic taste of our delicious Vegeta
          </p>
          <div className="flex flex-col items-center gap-4 mb-12">
            <p className="text-lg">
              <strong>Address:</strong> Vegeta, La Marsa, Tunisia
            </p>
            <p className="text-lg">
              <strong>Hours:</strong> Monday - Sunday: 11:00 AM - 10:00 PM
            </p>
            <p className="text-lg">
              <strong>Phone:</strong> 26 338 571
            </p>
          </div>
        </div>
        <Map />
      </div>
    </section>
  );
};

export default Location; 