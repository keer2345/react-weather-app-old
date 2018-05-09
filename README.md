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




