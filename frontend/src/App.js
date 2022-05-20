import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

function App() {
  return (
 <BrowserRouter>
  <Routes>
    <Route exact path="/" element={ <Home /> } />
    <Route exact path="/createPost" element={ <CreatePost /> } />
  </Routes>
 </BrowserRouter>
  );
}
export default App;
