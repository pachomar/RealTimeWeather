import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
class WeatherMap extends Component {
    constructor(props){
        super(props);
        this.state = { 
            center: {
                lat: props.lat,
                lng: props.lon
              },
         };
    }

    componentWillReceiveProps(props) {
        this.setState({
            center: {
                lat: props.lat,
                lng: props.lon
              }
        });
    }

  render() {
    return (
      <div style={{ height: '300px', width: '500px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCfbGJbLCL1FkocKFetZD71cqlyxfR9fuY" }}
          center={this.state.center}
          defaultZoom={11}
        >
          <div className="mapMarker"
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={this.props.city.name}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default WeatherMap;