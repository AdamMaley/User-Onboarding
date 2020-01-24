import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import UserForm from './components/Form.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserForm species="tiger" size="small"/>
    </div>
  );
}

export default App;
