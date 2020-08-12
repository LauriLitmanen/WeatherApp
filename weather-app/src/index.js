import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';


// ===========CURRENT========CURRENT==============CURRENT===============CURRENT==============CURRENT=================CURRENT================CURRENT
class Current extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        
    }

    componentDidMount() {
        
        
      }

     
        
      

      
    
    render() {
        return (
        <div className="current" >
            <div className="current-content">
                <h1 className="current-location">{this.props.location}</h1>
                <h2>Now</h2>
                <img className="current-img" src= {process.env.PUBLIC_URL + '/icons/' +  this.props.src + '.png'}/>
                <div className="wind-container">
                        <img className="wind" src={process.env.PUBLIC_URL + '/icons/' + 'wind.png'} style={{transform: "rotate("+ this.props.wind_deg +"deg)", transitionProperty: "transform", transitionDuration: "3s"}}></img>
                        <div className="wind-speed" >{Math.round(this.props.wind_speed)}</div>
                </div>

                
                <div className="current-temp">
                    <p className="current-temp-high">{  this.props.temp >= 0 ? '+' + this.props.temp  + '°' :  + '-' + this.props.temp  + '°' || 0 + '°'}</p>
                    <p className=""></p>                 
                </div>
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
            <button onClick={()=> { cardClicked(this.props) }} className="card">
                <p className="date">{this.props.date}</p>
                <img className="icon-img" src={process.env.PUBLIC_URL + '/icons/' +  this.props.src + '.png'}></img>
                <div className="wind-container">
                    <img className="wind" src={process.env.PUBLIC_URL + '/icons/' + 'wind.png'} style={{transform: "rotate("+ this.props.wind_deg +"deg)", transitionProperty: "transform", transitionDuration: "3s" }}></img>
                    <div className="wind-speed" >{this.props.wind_speed}</div>
                </div>
                <div className="temp">
                    <p className="temp-high">{this.props.temp_high >= 0 ? '+' + this.props.temp_high + '°' : '-' + this.props.temp_high + '°' || 0 + '°'}</p> 
                    <p className="temp-low">{this.props.temp_low >= 0 ? '+' + this.props.temp_low + '°' : '-' + this.props.temp_low + '°' || 0 + '°'}</p>              
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
            cityName: '',
            error: null,
        };
        this.getMyLocation = this.getMyLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
        this.getCurrentData = this.getCurrentData.bind(this);
        
    }
    
    componentDidMount() {
   
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
        let currentLink = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=a81617600377ed89c2f6596d66a72c1c&units=metric'        
        //console.log(link);
        this.getData(link);
        this.getCurrentData(currentLink);


        }, (error) => {
            if (error.PERMISSION_DENIED) {
                console.log("Error: permission denied");
                // Your custom modal here.
                alert("This app needs your permission to use your location." + "Click the 🔒 or ℹ in the left corner of the address bar and allow location services");
            }
            else {
                console.log("error" + error);
            }
            
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        })
    }
    }


    getCurrentData(link){
        fetch(link)
        .then(res => res.json())
        .then(
        (result) => {
            console.log('result ok:', result.cod);
            console.log('current getdata');
            console.log('result: ' , result);

            if (result.cod == 200) {
                let number = result.main.temp;
                let rounded = Math.round(number);
           
                this.setState({
                    currentLocation: result.name,
                    currentTemp: rounded,
                    currentSrc: result.weather[0].icon,
                    currentWind_deg: result.wind.deg,
                    currentWind_speed: result.wind.speed,
                });
                //console.log(result);
            }
            else {
                alert(result.message);
            }
            
        },
        (error) => {
            this.setState({
              isLoaded: true,
              error
        
            });  
        }  
        );
      }

    getData(link) {
       
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
                console.log('inside getData');
                var highest_temp;                                        //  declare date variable and set date to 1
                var lowest_temp;
                //console.log(result.list[1]);
                //console.log(link);
                console.log(result);
                    if (result.cod == 200) {
                        for (i = 0; i < result.list.length; i++) {                  //  Loop through every list item in results
                            var copy_of_i= i;                                       //  declare some variables
                            var prev_i = copy_of_i - 1;
                            var date = result.list[i].dt_txt;                       //  store date from current list item
                            
                            if(i == 0) {            
                                day = 1;                                            //  first list item is day 1
                            }
                            else if (i > 0) {                                       //  if list item is not first
                                var prev_date = result.list[prev_i].dt_txt;         //  declare yesterday variable
                                if((date.slice(8,10)) == (prev_date.slice(8,10))) { //  compare current list items date to previous list items date
                                    day = day;                                      //  if it's a match then its still the same day
                                }
                                else {                                              //  if not then the day has changed
                                    day = day + 1;
                                    highest_temp = null;                            // on day change discard highest and lowest temp
                                    lowest_temp = null;                              
                                }
                            }
    
                            if (highest_temp == null) {                             // Get highest temp of the day
                                highest_temp = result.list[i].main.temp_max
                            }
                            if (result.list[i].main.temp_max > highest_temp){           
                                highest_temp = result.list[i].main.temp_max
                            }
    
    
                            if (lowest_temp == null) {                              // Get lowest temp of the day
                                lowest_temp = result.list[i].main.temp_min
                            }
                            if (result.list[i].main.temp_min < lowest_temp){
                                lowest_temp = result.list[i].main.temp_min
                            }
    
                            var date = {
                                'id': day,                                          //  use the day variable as an id for date object
                                'dateAndTime': result.list[i].dt_txt,
                                'highest_temp': highest_temp,
                                'lowest_temp': lowest_temp,
                                'temp_max': result.list[i].main.temp_max,
                                'temp_min': result.list[i].main.temp_min,
                                'icon': result.list[i].weather[0].icon,
                                'desc': result.list[i].weather[0].description,
                                'wind_deg': result.list[i].wind.deg,
                                'wind_speed': result.list[i].wind.speed,
                            }
    
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
                        }
                        console.log('inside getData()' , datesList, link);
                        this.setState({
                            datesList: datesList,                               //  update state dateslist
                        });
                        // console.log('STATELIST = ' ,this.state.datesList);
                        //console.log(result);
                        //console.log(this.state.datesList.length);
                        //console.log(this.state.datesList.day1[1].icon);
                        //console.log('datesList: ' , this.state.datesList);
                        //this.renderCard(1);
                        this.setState({
                            isLoaded: true,
                        });
                    }
                    else {
                        alert(result.message);
                        this.setState({
                            isLoaded: false,
                        });
                    }
                    
                
            },
            (error) => {
                this.setState({
                  isLoaded: true,
                  error
            
                });  
            }   
        )
}


    handleChange(event){
        this.setState({cityName: event.target.value});
        event.preventDefault();
    }

    handleSubmit(event) {
        let x = this.state.cityName;
        console.log(x);
        let link = 'http://api.openweathermap.org/data/2.5/forecast?q=' + this.state.cityName + '&appid=a81617600377ed89c2f6596d66a72c1c&units=metric&mode=json';
        let currentLink = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityName + '&appid=a81617600377ed89c2f6596d66a72c1c&units=metric&mode=json'; 
        console.log(link);
        this.getData(link);
        this.getCurrentData(currentLink);
        event.preventDefault();
        
    }

    
// <Card src={this.state.datesList.day1[1].icon}> </Card>
    render() {
        
        const isLoaded = this.state.isLoaded;
        let day1, day2, day3, day4, day5, day6, current;
        if(isLoaded) {
            
            
           let day1Date = getDayName(this.state.datesList.day1[this.state.datesList.day1.length -1].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day1[this.state.datesList.day1.length -1].dateAndTime);
           let day2Date = getDayName(this.state.datesList.day2[5].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day2[5].dateAndTime);
           let day3Date = getDayName(this.state.datesList.day3[5].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day3[5].dateAndTime);
           let day4Date = getDayName(this.state.datesList.day4[5].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day4[5].dateAndTime);
           let day5Date = getDayName(this.state.datesList.day5[5].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day5[5].dateAndTime);
           let day6Date = getDayName(this.state.datesList.day6[this.state.datesList.day6.length -1].dateAndTime, "en", "EN") + " " + parseDate(this.state.datesList.day6[this.state.datesList.day6.length -1].dateAndTime);


            current = <Current
                            src={this.state.currentSrc}
                            location={this.state.currentLocation}
                            wind_deg={this.state.currentWind_deg}
                            wind_speed={this.state.currentWind_speed}
                            temp={this.state.currentTemp}
                            />;

            day1 =  <Card 
                            src={this.state.datesList.day1[1].icon}
                            temp_high={Math.round(this.state.datesList.day1[this.state.datesList.day1.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day1[this.state.datesList.day1.length -1].lowest_temp)}
                            date={day1Date}
                            wind_deg={this.state.datesList.day1[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day1[1].wind_speed)}
                            allData={this.state.datesList.day1}
                            />;

            day2 =  <Card 
                            src={this.state.datesList.day2[5].icon}
                            temp_high={Math.round(this.state.datesList.day2[this.state.datesList.day2.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day2[this.state.datesList.day2.length -1].lowest_temp)}
                            date={day2Date}
                            wind_deg={this.state.datesList.day2[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day2[1].wind_speed)}
                            allData={this.state.datesList.day2}
                            />; 
            day3 =  <Card 
                            src={this.state.datesList.day3[5].icon}
                            temp_high={Math.round(this.state.datesList.day3[this.state.datesList.day3.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day3[this.state.datesList.day3.length -1].lowest_temp)}
                            date={day3Date}
                            wind_deg={this.state.datesList.day3[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day3[1].wind_speed)}
                            allData={this.state.datesList.day3}
                            />; 
            day4 =  <Card 
                            src={this.state.datesList.day4[5].icon}
                            temp_high={Math.round(this.state.datesList.day4[this.state.datesList.day4.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day4[this.state.datesList.day4.length -1].lowest_temp)}
                            date={day4Date}
                            wind_deg={this.state.datesList.day4[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day4[1].wind_speed)}
                            allData={this.state.datesList.day4}
                            />; 
            day5 =  <Card 
                            src={this.state.datesList.day5[5].icon}
                            temp_high={Math.round(this.state.datesList.day5[this.state.datesList.day5.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day5[this.state.datesList.day5.length -1].lowest_temp)}
                            date={day5Date}
                            wind_deg={this.state.datesList.day5[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day5[1].wind_speed)}
                            allData={this.state.datesList.day5}
                            />; 
            day6 =  <Card 
                            src={this.state.datesList.day6[this.state.datesList.day6.length -1].icon}
                            temp_high={Math.round(this.state.datesList.day6[this.state.datesList.day6.length -1].highest_temp)}
                            temp_low={Math.round(this.state.datesList.day6[this.state.datesList.day6.length -1].lowest_temp)}
                            date={day6Date}
                            wind_deg={this.state.datesList.day6[1].wind_deg}
                            wind_speed={Math.round(this.state.datesList.day6[1].wind_speed)}
                            allData={this.state.datesList.day6}
                            />;
            
        }
        else {
            current = <Current/>;
            day1 = <Card/>;
            day2 = <Card/>;
            day3 = <Card/>;
            day4 = <Card/>;
            day5 = <Card/>;
            day6 = <Card/>;
        }
        return(
           

            <div className="main" /*style={{backgroundImage: "url(wallpapers/" +this.state.datesList.day1[].icon + ".png)"}} */>

            <button  id="locationButton" onClick={this.getMyLocation}> <img src={'/icons/location.png'}/> </button>
    
            <form onSubmit={this.handleSubmit}>
                <label>
                City Name:
                <input id="cityInput" type="text" placeholder="E.g. Seattle" value={this.state.cityName} onChange={this.handleChange} />
                </label>
                <input id="searchButton" type="submit" value="Search" />
            </form>
                

                <div className="current-wrapper"  >
                   {current}
                </div>
                <div className="cards-wrapper">
                    {day1}
                    {day2}
                    {day3}
                    {day4}
                    {day5}
                    {day6}
                </div>
                <div id="hourly-wrapper" >
                    
                </div>
               
               

              
                <div id="myModal" className="modal">

  
                <div className="modal-content" id="modalContent">
                    <span className="close" id="close">&times;</span>
                    <p id="modal-header"></p>
                </div>

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
    
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    month = month.replace("0","");
    let hour = date.slice(11,16);
    
    return(day + '.' + month );
}

function getDayName(dateString, locale)
{
    var date = new Date(dateString);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

function cardClicked(data) {
    //console.log("klik");
    //console.log(data);
    var element = document.getElementById("hourly-wrapper");
    var i = 1;
    element.style.display = "flex";
    element.innerHTML = '';
    for (i = 1 ;i < data.allData.length; i++) {
        let div = document.createElement('div');
        div.classList.add("hourly-div");

        let headerDate = parseDate(data.allData[i].dateAndTime); //Modal header
        let dateName = getDayName(data.allData[i].dateAndTime, "en", "EN");
        document.getElementById("modal-header").innerHTML =  dateName + " " + headerDate ;
        
        let image = document.createElement('img');                  //image
        image.src = '/icons/' + data.allData[i].icon + '.png' ;

        let time = document.createElement('p');                     //time
        let parsedTime = data.allData[i].dateAndTime.slice(11,16);
        time.innerHTML = parsedTime;

        let temp = document.createElement('p');                     //temp
        if (Math.round(data.allData[i].temp_max) >= 0) {
            temp.innerHTML =  '+' + Math.round(data.allData[i].temp_max) + '°';
        }
        else {
            temp.innerHTML =  '-' + Math.round(data.allData[i].temp_max) + '°';
        }

        let windContainer = document.createElement('div');          //wind
        windContainer.classList.add("wind-container");
        let wind = document.createElement('img');
        let windSpeed = document.createElement('div');
        windSpeed.classList.add("wind-speed");
        windSpeed.innerHTML = Math.round(data.allData[i].wind_speed);
        wind.classList.add("wind");
        wind.src = '/icons/wind.png';
        wind.style.cssText = "transform: rotate(" + data.allData[i].wind_deg + "deg); transition-property: transform; transition-duration: 3s;";
        windContainer.appendChild(wind);
        windContainer.appendChild(windSpeed);
        
        //transform: "rotate("+ this.props.wind_deg +"deg)", transitionProperty: "transform", transitionDuration: "3s" 
        
        element.appendChild(div);
        div.appendChild(time);
        div.appendChild(image);
        div.appendChild(temp);
        div.appendChild(windContainer);
        modalContent.appendChild(div);
        modal.style.display = "flex";
        

        //console.log(i);
    }
}

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the modal content div
  var modalContent = document.getElementById("modalContent");

  // Get the button that opens the modal
  var card = document.getElementsByClassName("card");
  
  // Add event listener to document and delegate it to the dynamically added <span> tag
  document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'close'){
        spanClicked();
        
    }
});
  
  // When the user clicks on the button, open the modal
  card.onclick = function() {
    modal.style.display = "block";
  }

  
  
  
  // When the user clicks on <span> (x), close the modal
    function spanClicked() {
        modal.style.display = "none";
        modalContent.innerHTML = ' ';
        let header = document.createElement('p');
        header.setAttribute("id","modal-header");
        let exitButton = document.createElement("span");
        exitButton.classList.add("close");
        exitButton.innerHTML = "&times;"
        exitButton.setAttribute("id","close");
        modalContent.appendChild(exitButton);
        modalContent.appendChild(header);
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent.innerHTML = ' ';
        let header = document.createElement('p');
        header.setAttribute("id","modal-header");
        let exitButton = document.createElement("span");
        exitButton.classList.add("close");
        exitButton.innerHTML = "&times;"
        exitButton.setAttribute("id","close");
        modalContent.appendChild(exitButton);
        modalContent.appendChild(header);
    }
  }

  



/*<form onsubmit="return validateForm()">
<label for="search">Search by City: </label>
<input type="text" id="search" name="search"></input>
<input type="submit" value="Search"></input>

</form>*/