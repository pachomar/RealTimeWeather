import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class GridView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          columnDefs: [
            { headerName: "Date", field: "searchDate", sortable: true },
            { headerName: "City", field: "city", sortable: true },
            { headerName: "Weather", field: "weather", sortable: true },
            { headerName: "Temperature", field: "temperature", sortable: true },
            { headerName: "Max Temp", field: "maxTemperature", sortable: true },
            { headerName: "Min Temp", field: "minTemperature", sortable: true }],
          rowData: []
        }

        this.fetchOptions = this.fetchOptions.bind(this);
      }

    componentDidMount() {
        this.fetchOptions();
    }

    fetchOptions(){
        fetch('http://localhost:3001/searches',{method: 'GET'})
        .then(res => res.json())
        .then(data => { 
            var sortedEvents = data.sort(function(a,b){ return new Date(b.searchDate) - new Date(a.searchDate); });
            this.setState({rowData: sortedEvents.slice(0,5)});
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to load searches');
        });
    }

    addResults = (search) => {
        fetch('http://localhost:3001/searches', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: search
        })
        .then((json) => {
            this.fetchOptions()
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to save game results');
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.addNewSearch !== this.props.addNewSearch) {
            this.addResults(this.props.addNewSearch);
        }
    }

    render () {
        return (
            <div className="ag-theme-alpine" style={{height: '500px'}}>
                <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData}></AgGridReact>
            </div>
        );
    }
}

export default GridView;