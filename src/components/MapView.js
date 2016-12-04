import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      username: 'user',
      password: 'lala',
      lat: 51.54435360000001,
      lng: -0.020013899999980822,
      zoom: 100,
    };
    this.getAllUserState = this.getAllUserState.bind(this);
  }

  componentWillMount() {
    this.pubNub = new PubNub({
      publishKey: 'pub-c-260e570c-07b0-4988-805c-1c6e0014407d',
      subscribeKey: 'sub-c-07c504da-b962-11e6-b490-02ee2ddab7fe',
    });

    this.pubNub.addListener({
      message: (message) => {
        this.getAllUserState();
      }
    });

    // Subscribing to secure channel
    this.pubNub.subscribe({
      channels: ['secure'],
    });

    this.getAllUserState();

    navigator.geolocation.getCurrentPosition((currentPosition) => {
      this.setState({
        ...this.state,
        lat: currentPosition.coords.latitude,
        lng: currentPosition.coords.longitude,
      });
      this.updateLocation(currentPosition.coords.latitude, currentPosition.coords.longitude);
    },
    (error) => {
      	console.log('Error: ', error);
    	},
    { enableHighAccuracy: true }
    );
  }

  componentWillUnmount() {
    this.pubNub.unsubscribe({ channel: 'secure' });
  }

  getAllUserState() {
    this.pubNub.hereNow(
      {
        channels: ['secure'],
        includeUUIDs: true,
        includeState: true,
      },
      (status, response) => {
        console.log('here now: ', response);
        this.setState({
          ...this.state,
          users: response.channels.secure.occupants,
        });
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
          {
            this.state.users.map((user) => {
              const userPosition = [user.state.lat, user.state.lng];
              return (
                <Marker
                  key={user.uuid}
                  position={userPosition}
                >
                  <Popup>
                    <span>You're a wizard Harry!</span>
                  </Popup>
                </Marker>
              );
            })
          }
        </Map>
      </div>
    );
  }

  updateLocation(lat, lng) {
    this.pubNub.setState(
      {
        state: { 'username': this.state.username, 'password': this.state.password, 'lat': lat, 'lng': lng},
        channels: ['secure'],
      },
        (status, response) => {
          console.log('set state res: ', response);
          const publishConfig = {
            channel: 'secure',
            message: {
              username: this.state.username,
              password: this.state.password,
              lat,
              lng,
            },
          };

          this.pubNub.publish(publishConfig, () => {
            setTimeout(() => {
              navigator.geolocation.getCurrentPosition((currentPosition) => {
                this.updateLocation(currentPosition.coords.latitude, currentPosition.coords.longitude);
              },
                (error) => {
                  console.log('Error: ', error);
                },
                { enableHighAccuracy: true }
              );
            }, 200);
          });
        }
    );
  }
}

export default MapView;
