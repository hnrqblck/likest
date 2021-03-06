import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import axios from 'axios';
import { Login } from './components/Login';
import LinkedInShare from './components/LinkedInShare';
import Home from './components/Home';
import { TabIndex } from './components/Context/TabIndexContext'


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
            <TabIndex>
              <Home />
            </TabIndex>
          </Route>
          <Route path="/share">
            {/* <LinkedInShare /> */}
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;