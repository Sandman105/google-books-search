//So we don't need App.js to be stateful because it's only going to handle routes.
import React from 'react';
//So here we are going to use react-router-dom package, since again we are only handling routes here.
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import Search from './pages/Search'
import Saved from './pages/Saved'
import Crap404 from './pages/Crap404'

// We don't need props here since there is nothing above App
// This is going to our default page, which is called Search, so line 19
// So Search route is going to go to Search, so line 20
// And if none of these routes hit, then we are going to go to our Crap404 page, so line 22

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route component={Crap404} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App