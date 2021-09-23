import React from "react";
import { Route } from "react-router-dom"; 

//components
import Landing from "./views/Landing";
import FullWeather from "./components/weather/fullWeather";
import SectionCreator from "./components/section/sectionCreator";
import SignInPage from "./components/authentication/SignIn/index";
import SignUpPage from "./components/authentication/SignUp";
import PasswordForgetPage from "./components/authentication/PasswordForget";
import AccountConfirmation from "./components/authentication/Account/AccountConfirmation";
import UsersAdmin from "./components/admin/users/index";
import ReportCreator from'./components/report/reportCreator/ReportCreator';
import TagCreator from './components/tag/TagCreator';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Landing}/>
      <Route path="/fullWeather"component={FullWeather}/>
      <Route path="/create-section" component={SectionCreator}/>
      <Route path="/signin" component={SignInPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/password-forget" component={PasswordForgetPage}/>
      <Route path="/AccountConfirmation" component={AccountConfirmation}/>
      <Route path="/admin/users" component={UsersAdmin}/>
      <Route path="/create-report" component={ReportCreator} />
      <Route path="/create-tag" component={TagCreator} />
    </React.Fragment>
  );
}

export default App;
