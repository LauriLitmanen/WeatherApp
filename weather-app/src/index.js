import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';


// ===========CURRENT========CURRENT==============CURRENT===============CURRENT==============CURRENT=================CURRENT================CURRENT
class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            link: '',
            location: '',
            locationKey: '',
            src: null,
            temp: null,
            data: null,
            err: null,
        };
        this.getMyLocation = this.getMyLocation.bind(this)
    }

    componentDidMount() {
        this.getMyLocation();
      }

      getMyLocation() {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
          location.getCurrentPosition((position) => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })

            let link = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=a81617600377ed89c2f6596d66a72c1c&units=metric';
            console.log(link);
            fetch(link)
            .then(res => res.json())
            .then(
            (result) => {
                
                let number = result.main.temp;
                let rounded = Math.round(number * 10) / 10;
                this.setState({
                    location: result.name,
                    temp: rounded,
                    src: result.weather[0].icon,
                });
                console.log(result);
            });
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
          })
        }
      }
    
    render() {
        return (
        <div className="current" >
            <h1 className="current-location">{this.state.location}</h1>
            <img className="current-img" src= {process.env.PUBLIC_URL + '/icons/' +  this.state.src + '.png'}/>
            
            <div className="current-temp">
                <p className="current-temp-high">{this.state.temp + '°'}</p>
                <p className=""></p>                 
            </div>
            
        </div>
        );
        
    }
}
//===============CARD==========CARD============CARD============CARD============CARD==========CARD========CARD
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <button className="card">
                <p>{this.props.date}</p>
                <img src={process.env.PUBLIC_URL + '/icons/' +  this.props.src + '.png'}></img>
                <div className="temp">
                    <p className="temp-high">{this.props.temp_high + '°'}</p>              
                </div>
            </button>
        );
    }
}
//============APP=============APP============APP============APP================APP============APP=============APP
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datesList: {
               day1:[{}],
               day2:[{}],
               day3:[{}],
               day4:[{}],
               day5:[{}],
               day6:[{}],
            },
            latitude: null,
            longitude: null,
            pvm: '',
            src: '',
            isLoaded: false,
        };
        this.getMyLocation = this.getMyLocation.bind(this);
        
    }
    
    componentDidMount() {
        this.getMyLocation();
        
      }

    getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    if (location) {
        location.getCurrentPosition((position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })

        let link = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=a81617600377ed89c2f6596d66a72c1c&units=metric';
        console.log(link);
        fetch(link)
        .then(res => res.json())
        .then(
        (result) => {
            
            let i;
            let day = 1; 
            var datesList  =  {
                day1:[{}],
                day2:[{}],
                day3:[{}],
                day4:[{}],
                day5:[{}],
                day6:[{}],
            };
                                                           //  declare date variable and set date to 1
            for (i = 0; i < result.list.length; i++) {                  //  Loop through every list item in results
                var copy_of_i= i;                                       //  declare some variables
                var prev_i = copy_of_i - 1;
                var date = result.list[i].dt_txt;                       //  store date from current list item
                
                if(i == 0) {            
                    day = 1;                                            //  first list item is day 1
                }
                else if (i > 0) {                                       //  if list item is not first
                    var prev_date = result.list[prev_i].dt_txt;         //  declare yeasterday variable
                    if((date.slice(8,10)) == (prev_date.slice(8,10))) { //  compare current list items date to previous list items date
                        day = day;                                      //  if it is a match then its still the same day
                    }
                    else {                                              //  if not then the day has changed
                        day = day + 1;                              
                    }
                }
                
                var date = {
                    'id': day,                                          //  use the day variable as an id for date object
                    'dateAndTime': result.list[i].dt_txt,
                    'temp_max': result.list[i].main.temp_max,
                    'temp_min': result.list[i].main.temp_min,
                    'icon': result.list[i].weather[0].icon,
                    'desc': result.list[i].weather[0].description,
                    'wind_deg': result.list[i].wind.deg,
                    'wind_speed': result.list[i].wind.speed,
                }
                                 
                //var datesList = this.state.datesList;                   //  make a copy of dateslist
                

                if (day === 1){
                    datesList.day1.push(date);                                   //  add new date to copy of datelist
                }
                else if (day === 2){
                    datesList.day2.push(date); 
                }
                else if (day === 3){
                    datesList.day3.push(date); 
                }
                else if (day === 4){
                    datesList.day4.push(date); 
                }
                else if (day === 5){
                    datesList.day5.push(date); 
                } 
                else if (day === 6){
                    datesList.day6.push(date); 
                }   
                
                console.log(datesList);
 

            }
            this.setState({
                datesList: datesList,                               //  update state dateslist
            });
            // console.log('STATELIST = ' ,this.state.datesList);
            //console.log(result);
            //console.log(this.state.datesList.length);
            //console.log(this.state.datesList.day1[1].icon);
            console.log('datesList: ' , this.state.datesList);
            //this.renderCard(1);
            this.setState({
                isLoaded: true,
            });
        });


        }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        })
    }
    }

    
// <Card src={this.state.datesList.day1[1].icon}> </Card>
    render() {
        
        const isLoaded = this.state.isLoaded;
        let day1, day2, day3, day4, day5, day6;
        if(isLoaded) {
           let day1Date = parseDate(this.state.datesList.day1[this.state.datesList.day1.length -1].dateAndTime);
           let day2Date = parseDate(this.state.datesList.day2[5].dateAndTime);
           let day3Date = parseDate(this.state.datesList.day3[5].dateAndTime);
           let day4Date = parseDate(this.state.datesList.day4[5].dateAndTime);
           let day5Date = parseDate(this.state.datesList.day5[5].dateAndTime);
           let day6Date = parseDate(this.state.datesList.day6[this.state.datesList.day6.length -1].dateAndTime);

            day1 =  <Card 
                            src={this.state.datesList.day1[1].icon}
                            temp_high={Math.round(this.state.datesList.day1[1].temp_max * 10) / 10}
                            date={day1Date} 
                            />;

            day2 =  <Card 
                            src={this.state.datesList.day2[5].icon}
                            temp_high={Math.round(this.state.datesList.day2[1].temp_max * 10) / 10}
                            date={day2Date}
                            />; 
            day3 =  <Card 
                            src={this.state.datesList.day3[5].icon}
                            temp_high={Math.round(this.state.datesList.day3[1].temp_max * 10) / 10}
                            date={day3Date}
                            />; 
            day4 =  <Card 
                            src={this.state.datesList.day4[5].icon}
                            temp_high={Math.round(this.state.datesList.day4[1].temp_max * 10) / 10}
                            date={day4Date}
                            />; 
            day5 =  <Card 
                            src={this.state.datesList.day5[5].icon}
                            temp_high={Math.round(this.state.datesList.day5[1].temp_max * 10) / 10}
                            date={day5Date}
                            />; 
            day6 =  <Card 
                            src={this.state.datesList.day6[this.state.datesList.day6.length -1].icon}
                            temp_high={Math.round(this.state.datesList.day6[this.state.datesList.day6.length -1].temp_max * 10 ) / 10}
                            date={day6Date}
                            />; 
        }
        else {
            day1 = <Card/>;
            day2 = <Card/>;
            day3 = <Card/>;
            day4 = <Card/>;
            day5 = <Card/>;
            day6 = <Card/>;

        }
        return(
            
            <div className="main" >
                <div className="current-wrapper"  >
                    <Current></Current>
                </div>
                <div className="cards-wrapper">
                    {day1}
                    {day2}
                    {day3}
                    {day4}
                    {day5}
                    {day6}
                </div>
                
            </div>
    );}
        
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
  );

//let locationKey = 134571; // Default Tampere


function parseDate(dateString) {
    var date = dateString;
    console.log(date);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    month = month.replace("0","");
    let hour = date.slice(11,16);
    console.log(day + '.' + month + ' ' + hour);
    return(day + '.' + month );
}


