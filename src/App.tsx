import React from 'react';
import './App.css';
import ZvazLayoutMain from './components/ZvazLayoutMain/ZvazLayoutMain';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory()
  console.log('!!-!!-!! history {210924112349}\n', history); // del+
  
  return (
    <div className="App">
      <ZvazLayoutMain/>
    </div>
  );
}

export default App;
