import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useCallback, memo, useEffect } from 'react';
import { setCenter } from '../actions/areaFilterActions';
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

function Map() {
  const [isPending, setIsPending] = useState(false);
  const areaFilter = useSelector(state => state.areaFilter);
  const center = useSelector(state => state.center);
  const kinderGartens = useSelector(state => state.kinderGartens);

  const [map, setMap] = useState(null);
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader(
    {
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    },
    [center],
  );

  useEffect(() => {
    if (areaFilter === 0) {
      dispatch(
        setCenter({
          lat: 37.568177,
          lng: 126.992217,
        }),
      );
    }
    if (areaFilter === 1) {
      dispatch(
        setCenter({
          lat: 37.523474,
          lng: 126.844036,
        }),
      );
    }
    if (areaFilter === 2) {
      dispatch(
        setCenter({
          lat: 37.495092,
          lng: 126.931558,
        }),
      );
    }
    if (areaFilter === 3) {
      dispatch(
        setCenter({
          lat: 37.515894,
          lng: 127.070571,
        }),
      );
    }
    if (areaFilter === 4) {
      dispatch(
        setCenter({
          lat: 37.589416,
          lng: 126.92703,
        }),
      );
    }
    if (areaFilter === 5) {
      dispatch(
        setCenter({
          lat: 37.648563,
          lng: 127.03758,
        }),
      );
    }
    if (areaFilter === 6) {
      dispatch(
        setCenter({
          lat: 37.533099,
          lng: 126.979087,
        }),
      );
    }
    if (areaFilter === 7) {
      dispatch(
        setCenter({
          lat: 37.583792,
          lng: 127.081658,
        }),
      );
    }
  }, [areaFilter, dispatch]);
  console.log(center);

  const onLoad = useCallback(
    function callback(mapValue) {
      const centerLatLng = new window.google.maps.LatLng(
        center.lat,
        center.lng,
      );
      const bounds = new window.google.maps.LatLngBounds(centerLatLng);
      const circle = new window.google.maps.Circle({
        center: centerLatLng,
        radius: areaFilter === 0 ? 10000 : 5000, // 500m 반경
      });
      bounds.union(circle.getBounds());
      mapValue.fitBounds(bounds);
    },
    [center, areaFilter],
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
                      <div
                        className="flex-center onlyMobile:h-220 onlyMobile:w-226 onlyMini:w-160"
                        style={{ backgroundColor: 'white' }}
                      >
                        <MapCard
                          name={kinderGarten.name}
                          ratedReviewsAvg={kinderGarten.ratedReviewsAvg}
                          ratedReviewsCount={kinderGarten.ratedReviewsCount}
                          id={kinderGarten.kindergartenId}
                        />
                      </div>
                    </InfoWindowF>
                  )}
              </MarkerF>
            );
          })}
        <div className="flex-center fixed bottom-10 left-0 z-10 w-[100vw]">
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
