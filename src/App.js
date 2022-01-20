import  './App.scss';
import React from 'react';
import Table from './components/Table/TableContainer.js';
import Header from './components/Header/HeaderContainer.js';

function App() { 

  return (
    <div className="App">
      <Header />
      <Table />
    </div>
  );
}

export default App;
