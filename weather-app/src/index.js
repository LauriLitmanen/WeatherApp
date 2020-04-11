import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'mikä mikä maa',
            src: 'http://openweathermap.org/img/wn/10d@2x.png',
            temp: null,
        };
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
            
        } else { 
            return alert("Geolocation is not supported by this browser.");
             
        }
    }

    showPosition(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var link = 
            'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=qQVpGxmx2OpE3mtOGNhRfIDoVuzNZKLk&q='
            + latitude
            + '%2C'
            + longitude
            + '&details=true';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
        var responseObject = JSON.parse(xhttp.responseText);
        const current = responseObject.EnglishName;
        return(console.log(current)); // --------------------------------------------Jatka tästä!!
            }
        };
        
        xhttp.open("GET", link, true);
        xhttp.send(); 
    }


    render() {
        return(
        <div className="current" >
            <h1 className="current-location">{this.state.location}</h1>
            <img className="current-img" src={this.state.src}></img>
            <div className="current-temp">
                <p className="current-temp-high">{this.state.temp}</p>           
            </div>
            <button className="get-location" onClick={() => this.getLocation()} >Paikanna</button>
        </div>
        );
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pvm: 'pvm',
            src: 'http://openweathermap.org/img/wn/10d@2x.png',
            temp: null,
        };
    }
    render() {
        return (
            <button className="card">
                <p>{this.state.pvm}</p>
                <img src={this.state.src}></img>
                <div className="temp">
                    <p className="temp-high">{this.state.temp}</p>              
                </div>
            </button>
        );
    }
}

function App() {
    return(
        <div className="main" >
            <div className="current-wrapper"  >
                <Current></Current>
            </div>
            <div className="cards-wrapper">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
            
        </div>
    );
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
  );

//let locationKey = 134571; // Default Tampere





