import React, { Component } from 'react';
import './WeatherDetails.css';

class WeatherDetails extends Component {

    constructor(props){
        super(props);
        this.state = { 
            city: props.city
         };
    }

    componentWillReceiveProps(props) {
        this.setState({
            city: props.city
        });
    }

    render() {    
        let icon;
        if(this.state.city.weather != null)
            icon = <img src={this.state.city.weather != null ? "http://openweathermap.org/img/wn/" + this.state.city.weather[0].icon + "@4x.png" : "" } width="150" height="150" />;
        else
            icon = <div></div>

        return (
            <table>
                <tbody>
                    <tr>
                        <td width="450px">
                            <div className="weather-info">
                                <a className="weather-prop">City Name: </a><label className="weather-label">{this.state.city != null ? this.state.city.name : ''}</label><br />
                                <a className="weather-prop">Temperature: </a><label className="weather-label">{this.state.city.main != null ? this.state.city.main.temp : ''}</label><br />
                                <a className="weather-prop">Humidity: </a><label className="weather-label">{this.state.city.main != null ? this.state.city.main.humidity : ''}</label><br />
                                <a className="weather-prop">Max Temperature: </a><label className="weather-label">{this.state.city.main != null ? this.state.city.main.temp_max : ''}</label><br />
                                <a className="weather-prop">Min Temperature: </a><label className="weather-label">{this.state.city.main != null ? this.state.city.main.temp_min : ''}</label><br />
                            </div>
                        </td>
                        <td>
                            <label className="weather-label-big">{this.state.city.weather != null ? this.state.city.weather[0].main : ''}</label>
                            {icon}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }        
}

export default WeatherDetails;