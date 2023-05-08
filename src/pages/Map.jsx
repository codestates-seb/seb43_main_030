import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useState, useCallback, memo, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.5303564,
  lng: 126.9897517,
};

const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(mapValue) {
    const centerLatLng = new window.google.maps.LatLng(center.lat, center.lng);
    const bounds = new window.google.maps.LatLngBounds(centerLatLng);
    const circle = new window.google.maps.Circle({
      center: centerLatLng,
      radius: 5000, // 500m 반경
    });
    bounds.union(circle.getBounds());
    mapValue.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback(function callback(mapValue) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ disableDefaultUI: true, styles: myStyles }}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <> </>
  );
}

export default memo(Map);
