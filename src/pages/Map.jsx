import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { useState, useCallback, memo, useEffect } from 'react';
import PinOn from '../images/pin-on.png';
import MapCard from '../components/Card/MapCard';

const containerStyle = {
  width: '100%',
  height: '100%',
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

  const markerValues = [
    { id: 1, lat: 37.536631, lng: 126.977376, name: '왈왈유치원' },
    { id: 2, lat: 37.5195, lng: 127.0239, name: '애견유치원' },
    { id: 3, lat: 37.495919, lng: 126.959497, name: '멍더가든' },
  ];

  const [map, setMap] = useState(null);

  const [center, setCenter] = useState({
    lat: 37.5303564,
    lng: 126.9897517,
  });

  const onLoad = useCallback(
    function callback(mapValue) {
      const centerLatLng = new window.google.maps.LatLng(
        center.lat,
        center.lng,
      );
      const bounds = new window.google.maps.LatLngBounds(centerLatLng);
      const circle = new window.google.maps.Circle({
        center: centerLatLng,
        radius: 5000, // 500m 반경
      });
      bounds.union(circle.getBounds());
      mapValue.fitBounds(bounds);
    },
    [center.lat, center.lng],
  );

  const onUnmount = useCallback(function callback(mapValue) {
    setMap(null);
  }, []);

  const [clickedMarker, setClickedMarker] = useState(null);

  const handleMarkerClick = markerValue => {
    setClickedMarker(markerValue);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ disableDefaultUI: true, styles: myStyles }}
    >
      {markerValues.map(markerValue => {
        return (
          <MarkerF
            key={markerValue.id}
            position={{ lat: markerValue.lat, lng: markerValue.lng }}
            onClick={() => handleMarkerClick(markerValue)}
            icon={{
              url: PinOn,
              scaledSize: new window.google.maps.Size(56, 56),
            }}
          >
            {clickedMarker && clickedMarker.id === markerValue.id && (
              <InfoWindowF
                position={{ lat: clickedMarker.lat, lng: clickedMarker.lng }}
                onCloseClick={() => setClickedMarker(null)}
              >
                <div style={{ backgroundColor: 'white' }}>
                  {/* <Pin name={markerValue.name} /> */}
                  <MapCard name={markerValue.name} />
                </div>
              </InfoWindowF>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  ) : (
    <> </>
  );
}

export default memo(Map);
