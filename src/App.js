import React from "react";
import './App.css';
import abi from './utils/Playground.json'
import { useEffect, useState } from 'react';
import ErrorView from './components/ErrorView';
import MainView from './views/MainView';

function App() {
  const [currentAccount, setCurrentAccount] = useState()
  const [siteError, setError] = useState({ showError: false, message: '' })


  return (
    <div className="App">
      <ErrorView setError={setError} siteError={siteError} />
      <MainView setCurrentAccount={setCurrentAccount} setError={setError} />
    </div>
  );
}

export default App;