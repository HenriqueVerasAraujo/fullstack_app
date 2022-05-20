import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';

function App() {
  return (
 <BrowserRouter>
  <Navbar />
  <Routes>
    <Route exact path="/" element={ <Home /> } />
    <Route exact path="/createPost" element={ <CreatePost /> } />
    <Route exact path="/post/id:" element={ <Home /> } />
  </Routes>
 </BrowserRouter>
  );
}
export default App;
