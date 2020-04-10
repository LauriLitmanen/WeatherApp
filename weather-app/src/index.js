import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




function Card(props) {
    return (
        <button className="card">
            <p>Pvm</p>
            <img src="http://openweathermap.org/img/wn/10d@2x.png"></img>
            <div className="temp">
                <p className="temp-high">25</p>
                <p className="temp-low">15</p>                
            </div>
        </button>
    )
}

function App() {
    return(
        <div className="wrapper">
            <Card></Card>
        </div>
    );
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
  );