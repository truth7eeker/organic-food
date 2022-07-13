import React from 'react'
import { useControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function Geocoder({setCoords}: {setCoords:React.Dispatch<React.SetStateAction<{
    lat: number;
    lng: number;
}>>}) {
    const control = new MapboxGeocoder({
        accessToken: `${process.env.REACT_APP_MAP_KEY}`,
        marker: false,
        language: 'ru-RU'
    })
    useControl(() => control)
    control.on('result', (e:any) => {
        const coords = e.result.geometry.coordinates
        setCoords({lng: coords[0], lat: coords[1]})
    })
  return null
}

export default Geocoder