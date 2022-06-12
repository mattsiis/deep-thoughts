import React from 'react';

import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient
} from '@apollo/client';
// import ApolloClient from 'apollo-boost';

import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
  
      <div className='flex-column justify-flex-start min-100-vh'>
        <Router>
          <Header></Header>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile/:username" element={<Profile />} />
              <Route exact path="/thought/:id" element={<SingleThought />} />

              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>

    </ApolloProvider >
  );
}

export default App;
