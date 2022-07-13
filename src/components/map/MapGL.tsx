import React, { useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocoder from './Geocoder';
import Input from '../input/Input';
import { handleAddressInfo } from '../../store/reducers/orderSlice/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

function MapGL() {
  const [coords, setCoords] = useState({
    lat: 54.32824,
    lng: 48.38657,
  });

  const { addressLine, extraInfo } = useSelector((state: any) => state.order.address);

  const handleCoords = (e: any) => {
    setCoords(e.lngLat);
  };

  const dispatch = useDispatch();

  const handleExtraInfo = (name: string, value: string) => {
    dispatch(handleAddressInfo({ name, value }));
  };

  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?country=ru&types=place%2Cpostcode%2Caddress&limit=1&access_token=${process.env.REACT_APP_MAP_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const value = data.features[0].place_name;
        dispatch(handleAddressInfo({ name: 'addressLine', value }));
      });
  }, [coords]);

  return (
    <div>
      <p style={{ margin: '1rem 0', fontWeight: '500' }}>{addressLine}</p>
      <Input
        placeholder="Доп. информация (№кв., блока)"
        width="50%"
        name="extraInfo"
        handleChange={handleExtraInfo}
        value={extraInfo}
      />
      <Map
        initialViewState={{
          longitude: 48.38657,
          latitude: 54.32824,
          zoom: 14,
        }}
        style={{ width: 600, height: 400, marginTop: '1rem' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAP_KEY}>
        <Marker
          longitude={coords.lng}
          latitude={coords.lat}
          color="red"
          draggable={true}
          style={{ cursor: 'pointer' }}
          onDragEnd={handleCoords}
        />
        <Geocoder setCoords={setCoords} />
      </Map>
    </div>
  );
}

export default MapGL;
