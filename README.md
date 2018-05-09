# React Weather App

> https://www.youtube.com/watch?v=204C9yNeOYI
> https://www.youtube.com/watch?v=P0vsGO4svUM

## Install
```
npm i create-react-app -g
```

```
create-react-app react-weather-app
```
创建成功后，会出现这样一段提示：
```
Success! Created react-weather-app at /home/qinjh/workplace/web/react/react-weather-app
Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-weather-app
  yarn start

Happy hacking!
```

## 基本框架
### App.js
这是一个最简单的*App.js*:
```javascript
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
          <h1>Hello React</h>
      </div>
    );
  }
}

export default App;
```
### 组件
创建组件*src/components/Titles.js*:
```javascript
import React, { Component } from "react";

class Titles extends Component {
  render() {
    return (
      <div>
        <h1>Wether Finder</h1>
        <p>Find out temperature, conditions and more ... </p>
      </div>
    );
  }
}

export default Titles;
```
在*App.js*中引用：
```javascript
import React from 'react';
import Titles from './components/Titles';

class App extends React.Component {
  render() {
    return (
      <div>
        <Titles/>
      </div>
    );
  }
}

export default App;
```
这样，一个最简单的组件框架的创建完成了。

我们还需要创建两个组件，分别是*Form.js*和*Weather.js*。

*App.js*:
```javascript
// ...

class App extends React.Component {
  render() {
    return (
      <div>
        <Titles/>
        <Form/>
        <Weather/>
      </div>
    );
  }
}
```

## Weather API
### 了解Weather API
- 注册Weather API: https://openweathermap.org/api
- 在[API keys](https://home.openweathermap.org/api_keys)页面获取*Key*。

可以通过如下地址获取气象信息：
- http://api.openweathermap.org/data/2.5/weather?q=liuzhou,cn&appid=7b16411dd4924750201c5f95945e5eb3&units=metric
- http://api.openweathermap.org/data/2.5/weather?q=Manchester,uk&appid=7b16411dd4924750201c5f95945e5eb3&units=metric

在*App.js*中添加`getWeather`方法:
```javascript
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
```

完善*Form.js*:
```javascript
class Form extends Component {
    render(){
        return(
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City"/>
                <input type="text" name="country" placeholder="country"/>
                <button>Get Weather</button>
            </form>
        );
    }
}
```

现在，输入城市和国家（比如*Manchester*和*uk*）就可以在浏览器终端中看到返回的JSON了。

## 将天气信息显示到页面
之前是显示在浏览器的终端上，但是我们想要的效果并不是那样，我们希望将信息显示到前端页面。我们在*App.js*创建一个`state`:
```javascript

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  // ...

  getWeather = async(e) => {

    // ...

    this.setState({
      temperature:data.main.temp,
      city:data.name,
      country:data.sys.country,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error:""
    });
  };

  render() {
    return (
      <div>
        <Titles/>
        <Form getWeather={this.getWeather}/>
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }

}

export default App;
```

*Weather.js*:
```javascript
class Weather extends Component {
    render() {
        return (
            <div>
                { this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>}
                { this.props.temperature && <p>Temperature: {this.props.temperature}</p>}
                { this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
                { this.props.description && <p>Description: {this.props.description}</p>}
                { this.props.error && <p>Error: {this.props.error}</p>}
            </div>
        );
    }
}
```
现在有个问题，如果输入的城市和国家为空的话，则会显示错误信息。我们做一下优化，当输入有误的时候不显示：
```javascript
    // ...

    console.log(data);

    if(city && country){
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the right city and country."
      });
    }

    // ...
```

### 进一步优化
*Weather.js*
