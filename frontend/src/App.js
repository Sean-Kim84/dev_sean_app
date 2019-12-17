import React from 'react';
import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
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
            </Switch>
          </section>
          <Footer />
        </React.Fragment> 
      </Router>
    </Provider>
  );
}

export default App;
