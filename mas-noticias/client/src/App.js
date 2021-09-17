import React from "react";
import { Route } from "react-router-dom"; 

//components
import Landing from "./views/Landing";
import FullWeather from "./components/weather/fullWeather";
import SectionCreator from "./components/section/sectionCreator";

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Landing}/>
      <Route path="/fullWeather"component={FullWeather}/>
      <Route path="/create-section" component={SectionCreator}/>
    </React.Fragment>
  );
}

export default App;
