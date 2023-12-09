import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const MapComponent = () => (
  <LoadScript
    googleMapsApiKey="AIzaSyB786sWZPGqu7hpzA2kCWw09Vw79uupn80"
  >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Your map markers and other components go here */}
    </GoogleMap>
  </LoadScript>
);

export default React.memo(MapComponent);
