import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import home from './pages/home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path='/' component={home} />
            <Route exact path='/user/:profileID' component={profile} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
