import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { useState, useCallback, memo, useEffect } from 'react';
import axios from 'axios';
import PinOn from '../images/pin-on.png';
import MapCard from '../components/Card/MapCard';
import Button from '../components/Button/Button';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

function Map({ areaFilter, setAreaFilter }) {
  const [kinderGartens, setKinderGartens] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/KinderGarten')
      .then(response => {
        setKinderGartens(response.data);
        setIsPending(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

  useEffect(() => {
    if (areaFilter === 0) {
      setCenter({
        lat: 37.523474,
        lng: 126.844036,
      });
    }
    if (areaFilter === 1) {
      setCenter({
        lat: 37.495092,
        lng: 126.931558,
      });
    }
    if (areaFilter === 2) {
      setCenter({
        lat: 37.498011,
        lng: 127.113862,
      });
    }
    if (areaFilter === 3) {
      setCenter({
        lat: 37.589416,
        lng: 126.92703,
      });
    }
    if (areaFilter === 4) {
      setCenter({
        lat: 37.648563,
        lng: 127.03758,
      });
    }
    if (areaFilter === 6) {
      setCenter({
        lat: 37.577173,
        lng: 127.08513,
      });
    }
  }, [areaFilter]);

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

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const [clickedMarker, setClickedMarker] = useState(null);

  const handleMarkerClick = markerValue => {
    setClickedMarker(markerValue);
  };

  return isLoaded ? (
    <div className="w-[100vw]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ disableDefaultUI: true, styles: myStyles }}
      >
        {kinderGartens &&
          kinderGartens.map(kinderGarten => {
            return (
              <MarkerF
                key={kinderGarten.kindergartenId}
                position={{
                  lat: kinderGarten.latitude,
                  lng: kinderGarten.longitude,
                }}
                onClick={() => handleMarkerClick(kinderGarten)}
                icon={{
                  url: PinOn,
                  scaledSize: new window.google.maps.Size(56, 56),
                }}
              >
                {clickedMarker &&
                  clickedMarker.kindergartenId ===
                    kinderGarten.kindergartenId && (
                    <InfoWindowF
                      position={{
                        lat: clickedMarker.lat,
                        lng: clickedMarker.lng,
                      }}
                      onCloseClick={() => setClickedMarker(null)}
                    >
                      <div style={{ backgroundColor: 'white' }}>
                        <MapCard
                          name={kinderGarten.name}
                          ratedReviewsAvg={kinderGarten.ratedReviewsAvg}
                          ratedReviewsCount={kinderGarten.ratedReviewsCount}
                        />
                      </div>
                    </InfoWindowF>
                  )}
              </MarkerF>
            );
          })}
        <div className="flex-center fixed bottom-[30px] left-0 w-[100%]">
          <Link to="/">
            <Button
              className="color-black z-10 flex h-50 w-190 items-center justify-around"
              icon="list"
            >
              리스트보기
            </Button>
          </Link>
        </div>
      </GoogleMap>
    </div>
  ) : (
    <> </>
  );
}

export default memo(Map);
