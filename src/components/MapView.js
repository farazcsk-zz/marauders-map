import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
    this.cb = this.cb.bind(this);
  }

  componentWillMount() {
    this.pubNub = new PubNub({
      publishKey: 'pub-c-260e570c-07b0-4988-805c-1c6e0014407d',
      subscribeKey: 'sub-c-07c504da-b962-11e6-b490-02ee2ddab7fe',
    });
    this.pubNub.addListener({
      status: (statusEvent) => {
        // console.log(statusEvent);
      },
      message: (message) => {
        if (message.message.action === 'UPDATED_LOCATION') {
          // get all users
          this.getAllUserState(cb);
        } else {
          // some other shit.
          // console.log(message);
        }
      },
      presence: (presenceEvent) => {
          // handle presence
        // console.log(presenceEvent);
      },
    });
    // Subscribing to secure channel
    this.pubNub.subscribe({
      channels: ['secure'],
    });

    this.pubNub.hereNow(
      {
        channels: ['secure'],
        includeUUIDs: true,
        includeState: true,
      },
      (status, response) => {
        this.setState({users: response.channels.secure.occupants});
        console.log(this.state);
      }
      );
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      this.updateLocation(currentPosition.coords.longitude, currentPosition.coords.latitude);
      // console.log('dsklfjhgdflksjh');
      // this.setState({
      //   ...this.state,
      //   located: true,
      //   lat: currentPosition.coords.latitude,
      //   lng: currentPosition.coords.longitude,
      //   zoom: 100,
      // });
    });
  }

  getAllUserState(cb) {
    this.pubnub.hereNow(
      {
        channels: ['secure'],
        includeUUIDs: true,
        includeState: true,
      },
      function something(status, response) {
        cb(response.channels.secure.occupants);
      }
      );
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
  cb(users) {
    this.setState({
      ...this.state,
      users,
    });
  }
  updateLocation(long, lat) {
    this.pubNub.setState(
      {
        state: { 'username': this.username, 'password': this.password, 'long': long, 'lat': lat},
        channels: ['secure'],
      },
        (status, response) => {
          const publishConfig = {
            channel: 'secure',
            message: {'password': 'lala', 'action': 'UPDATED_LOCATION'},
          };
          this.pubNub.publish(publishConfig, (status, response) => {
            // console.log("published to channel");
          });
        }
    );
  }
}

export default MapView;
