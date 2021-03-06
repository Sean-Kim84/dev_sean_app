import React,{ useEffect } from 'react';
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile_forms/CreateProfile';
import EditProfile from './components/profile_forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile_forms/AddExperience';
import AddEducation from './components/profile_forms/AddEducation';

import Profiles from './components/profiles/Profiles';

import Profile from './components/profile/Profile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>  
            </Switch>
          </section>
          <Footer />
        </React.Fragment> 
      </Router>
    </Provider>
  );
}

export default App;
