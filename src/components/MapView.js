import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
const position = [51.0, -0.09];

class MapView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Map
          style={{height: '100vh'}}
          center={position}
          zoom={10}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljLWNzcyIsImEiOiJjaXc5YmVjOXgwMDEyMnlxN3pvdGRjeTlxIn0.m8ImN5PX2X4OE1HWHv7n-Q"
            attribution="<attribution>" />
        </Map>
      </div>
    );
  }
}

export default MapView;
