import React, { Component } from 'react';
import './ParentComponent.css';
import Button from 'react-bootstrap/Button';
import WeatherDetails from '../WeatherDetails/WeatherDetails'
import WeatherMap from '../WeatherMap/WeatherMap'
import GridView from '../GridView/GridView'

class ParentComponent extends Component {
    
    constructor(){
        super();
        this.state = { 
            city: [],
            error: '',
            newSearch: ''
         };

         this.searchWeather = this.searchWeather.bind(this);
    } 

    searchWeather(){
        this.setState({ error: ''});
        var city = document.querySelector('#inputCity').value;

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c01f85db8a51adaeb85fbb67611b7de1',{})
        .then((res) => {
            return res.json();
        }).then((json) => {
            if(json.cod == 404)
                this.setState({ error: 'Please, check the name of the city'});
            else
            {
                this.setState({city: json});
                this.createRecord(city);
            }
        })
    }

    createRecord = () => {
        var search = JSON.stringify({
            "searchDate": new Date().toLocaleString('en-US'),
            "city": this.state.city.name,
            "weather": this.state.city.weather[0].main,
            "temperature": this.state.city.main.temp,
            "maxTemperature": this.state.city.main.temp_max,
            "minTemperature": this.state.city.main.temp_min
        });

        this.setState({ newSearch: search });
    }

    render() {
        let map;
        if(this.state.city.coord != null)
            map = <WeatherMap city={this.state.city.name} lat={this.state.city.coord.lat} lon={this.state.city.coord.lon}></WeatherMap>;
        else
            map = <div></div>

        return (<div>
                <table className="table-content">
                    <tbody>
                        <tr>
                            <td colSpan="2"><h4>Select the city you want to check</h4><br/></td>
                        </tr>
                        <tr>
                            <td width="50%">
                                <label >Type City Name</label>
                                <input className="controls" id="inputCity"/>
                                <Button variant="success" className="controls" onClick={this.searchWeather}>Search</Button>
                                <label id="searchError">{this.state.error}</label>
                            </td>
                            <td rowSpan="2">
                                {map}
                            </td>
                        </tr>
                        <tr>
                            <td>    
                                <WeatherDetails city={this.state.city}></WeatherDetails>
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                            <td colSpan="2">
                                <GridView addNewSearch={this.state.newSearch}></GridView>
                            </td>
                        </tr>
                        </tbody>
                </table>
            </div>
        )
    }
}

export default ParentComponent;
