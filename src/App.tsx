import React from 'react';
import './App.css';
import ZvazLayoutMain from './components/ZvazLayoutMain/ZvazLayoutMain';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory()

  return (
    <div className="App">
      <ZvazLayoutMain/>
    </div>
  );
}

export default App;
