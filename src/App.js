import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Login } from './components/Login';
import LinkedInShare from './components/LinkedInShare';
import Home from './components/Home';
import MainContenttt from './components/MainContent/MainContentcopy';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/share">
            <LinkedInShare />
          </Route>
          <Route path="/content">
            <MainContenttt />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;