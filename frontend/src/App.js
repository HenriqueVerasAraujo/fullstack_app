import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';
import PostPage from './pages/PostPage';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
 <BrowserRouter>
  <Navbar />
  <Routes>
    <Route exact path="/" element={ <Home /> } />
    <Route exact path="/createPost" element={ <CreatePost /> } />
    <Route exact path="/post/:id" element={ <PostPage /> } />
    <Route exact path="/register" element={ <Register /> } />
    <Route exact path="/login" element={ <Login /> } />
  </Routes>
 </BrowserRouter>
  );
}
export default App;
