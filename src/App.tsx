import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Watch} from "./watch/watch";
import {Guess} from "./guess";

function App() {
  return (
    <div className="App">
        <Watch/>
        <Guess/>
    </div>
  );
}

export default App;
