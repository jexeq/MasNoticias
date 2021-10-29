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
import ReportCreator from'./components/admin/reports/reportCreator/ReportCreator';
import DisplayAllReports from './components/admin/reports/adminReports/DisplayAllReports';
import DisplayAllVideos from './components/admin/reports/adminReports/DisplayAllVideos';
import ReportUpdater from './components/admin/reports/reportUpdater/ReportUpdater';
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
import ContactUs from './views/ContactUs';
import SelectReportToCreate from './components/admin/reports/adminReports/SelectReportToCreate';
import VideoReportCreator from './components/admin/reports/reportCreator/VideoReportCreator';
import ReportTypeSelector from './components/admin/reports/adminReports/index';
import VideoReportUpdater from './components/admin/reports/reportCreator/videoReportUpdater';
import Videos from './views/Videos';
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
      <Route exact path="/admin/reports/draft" component={DisplayAllReports}/>
      <Route exact path='/admin/reports/video' component={DisplayAllVideos}/>
      <Route exact path='/admin/reports' component={ReportTypeSelector}/>
      <Route exact path="/create-report" component={SelectReportToCreate} />
      <Route path="/admin/reports/edit-report/:reportId" component={ReportUpdater}/>
      <Route path='/admin/videos/edit-video/:videoId' component={VideoReportUpdater}/>
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
      <Route path="/contacto" component={ContactUs}/>
      <Route path='/admin/create-report/draft' component={ReportCreator}/>
      <Route path='/admin/create-report/video' component={VideoReportCreator}/>
      <Route path='/videos'component={Videos}/>
    </React.Fragment>
  );
}

export default App;
