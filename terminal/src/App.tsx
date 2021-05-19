import React from 'react';
import neonCard from './neon-card.png';
import payPass from './paypass.png';
import './App.css';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1>DoTapGo</h1>
      </header>
      <body>
        <img src={neonCard} height="250" />
        <form>
          <label htmlFor="amount">Amount: </label>
          <input id="amount" />
        </form>
        <a href=""><img className="paypass" src={payPass} height="100" /></a>
        {/* Todo: When form submits POST data to gin server -> stripe */}
      </body>
    </div>
  );
}

export default App;
