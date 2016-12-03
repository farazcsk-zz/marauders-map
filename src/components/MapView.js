import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      located: false,
      lat: 51.5073509,
      lng: -0.12775829999998223,
      zoom: 7,
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      this.setState({
        ...this.state,
        located: true,
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
        zoom: 10,
      });
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];

    return (
      <div>
        <Map
          style={{height: '100vh'}}
          center={position}
          zoom={this.state.zoom}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljLWNzcyIsImEiOiJjaXc5YmVjOXgwMDEyMnlxN3pvdGRjeTlxIn0.m8ImN5PX2X4OE1HWHv7n-Q"
            attribution="<attribution>" />
          { this.state.located ?
            <Marker position={position}>
              <Popup>
                <span>You're a wizard Harry!</span>
              </Popup>
            </Marker>
            :
            null
          }
        </Map>
      </div>
    );
  }
}

export default MapView;
