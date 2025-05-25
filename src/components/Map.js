// src/components/Map.js
'use client';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 33.7455,
  lng: -117.8677
};

export default function Map({ responders = [] }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
      {responders.map((responder, index) => (
        <Marker key={index} position={{ lat: responder.lat, lng: responder.lng }} label={responder.name} />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}