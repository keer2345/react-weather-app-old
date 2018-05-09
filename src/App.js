import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "7b16411dd4924750201c5f95945e5eb3";

class App extends React.Component {
  getWeather = async(e) => {
    e.preventDefault();

    const city =e.target.elements.city.value;
    const country =e.target.elements.country.value;

    const api_all = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_all.json();

    console.log(data);
  };
  
  render() {
    return (
      <div>
        <Titles/>
        <Form getWeather={this.getWeather}/>
        <Weather/>
      </div>
    );
  }
}

export default App;
