import React from "react";
import { Route } from "react-router-dom"; 

//components
import NavBar from "./components/navbar/NavBar";
import Landing from "./views/Landing";
import FullWeather from "./components/weather/fullWeather";
import SectionCreator from "./components/section/sectionCreator";
import SignInPage from "./components/authentication/SignIn/index";
import SignUpPage from "./components/authentication/SignUp";
import PasswordForgetPage from "./components/authentication/PasswordForget";
import AccountConfirmation from "./components/authentication/Account/AccountConfirmation";
import UsersAdmin from "./components/admin/users/index";
import ReportCreator from'./components/report/reportCreator/ReportCreator';
import DisplayAllReports from './components/admin/reports/adminReports/DisplayAllReports';
import ReportUpdater from './components/report/reportUpdater/ReportUpdater';
import NotFound from "./components/notFound/NotFound";
import ReportDetail from './views/ReportDetail';
import PublicityCreator from "./components/admin/publicity/PublicityCreator";
import PublicityManager from "./components/admin/publicity/PublicityManager";
import ChangePublicityState from './components/admin/publicity/ChangePublicityState';
import ChangePublicityPriority from './components/admin/publicity/ChangePublicityPriority';
import DeletePublicity from "./components/admin/publicity/DeletePublicity";
import PublicityUpdater from './components/admin/publicity/PublicityUpdater';
import ReportsBySection from './views/ReportsBySection';
import SearchReports from './views/SearchReports';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={NavBar}/>
      <Route exact path="/" component={Landing}/>
      <Route path="/fullWeather"component={FullWeather}/>
      <Route path="/create-section" component={SectionCreator}/>
      <Route path="/signin" component={SignInPage}/>
      <Route path="/signup" component={SignUpPage}/>
      <Route path="/password-forget" component={PasswordForgetPage}/>
      <Route path="/AccountConfirmation" component={AccountConfirmation}/>
      <Route path="/admin/users" component={UsersAdmin}/>
      <Route exact path="/admin/reports" component={DisplayAllReports}/>
      <Route path="/create-report" component={ReportCreator} />
      <Route path="/admin/reports/edit-report/:reportId" component={ReportUpdater}/>
      <Route path="/not-found" component={NotFound}/>
      <Route path="/report/:reportId" component={ReportDetail}/>
      <Route path="/admin/create-publicity" component={PublicityCreator}/>
      <Route exact path="/admin/publicity" component={PublicityManager}/>
      <Route path="/admin/publicity/state/:publicityId" component={ChangePublicityState}/>
      <Route path="/admin/publicity/priority/:publicityId" component={ChangePublicityPriority}/>
      <Route path="/admin/publicity/update/:publicityId" component={PublicityUpdater}/>
      <Route path="/admin/publicity/delete/:publicityId" component={DeletePublicity}/>
      <Route path="/sections/:sectionId" component={ReportsBySection}/>
      <Route path="/reports/search/:find" component={SearchReports}/>
    </React.Fragment>
  );
}

export default App;
