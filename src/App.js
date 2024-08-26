import React from 'react';
import Clock from './Clock';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{display: "flex", justifyContent: "center"}}>Timer</h1>
      </header>
      <Clock />
    </div>
  );
}

export default App;
