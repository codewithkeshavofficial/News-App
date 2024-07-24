import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import News from './Components/News';
import { Nav } from './Constants/Navbar';


const App = () => {
  return (
    <>
    <Routes >

      <Route path='/' exact element={<News/>} />
    {
      Nav.map((routes) => (
        <Route key={routes._id} path={!routes.category ? '/' : `/${routes.category}`} exact element={<News/>} />
      ))
    }


    </Routes>
    </>
  )
}

export default App
